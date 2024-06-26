import express from "express";
import { engine } from "express-handlebars";
import "dotenv/config";
import path from "path";
import { ormConfig } from "./config/orm.config";
import { DataSource, Not, IsNull } from "typeorm";
import { RequestEntity } from "./entities/request";
import { RTeamEntity } from "./entities/rteam";
import { FStationEntity } from "./entities/fstation";

//creates a new datasource instance that calls ormconfig
const AppDataSource = new DataSource(ormConfig);

// gives us access to create new entity recoreds (rows) and also allows to query in JS
const RequestRepository = AppDataSource.getRepository(RequestEntity).extend({});
const RTeamRepository = AppDataSource.getRepository(RTeamEntity).extend({});
const FStationRepository = AppDataSource.getRepository(FStationEntity).extend({});

// create the connect function
const connect = () => {
  AppDataSource.initialize()
    .then(() => {
      console.info("[Fire Service SQL DB] --> connected to DB");
    })
    .catch((error: any) => {
      console.log(error);

      console.error(`[Fire Service SQL DB] --> [DB Connection Error] --> ${error.message}`);
    });
};

//create a server instance and connect to it
const server = express();
connect();

// sets view engines used to render front-end
server.set("view engine", "handlebars");
server.engine(
  "handlebars",
  engine({
    layoutsDir: __dirname + "/../views/layouts",
  }),
);

// middleware
server.use(express.static(path.join(__dirname, "..", "public")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//routes
//render caller page
server.get("/", function (req, res) {
  res.render("caller", { layout: "index" });
});

// render overview page
server.get("/admin/overview", async (req, res) => {
  const incomingRequestCount = await RequestRepository.count({ where: { approved: false } });
  const approvedRequestCount = await RequestRepository.count({ where: { approved: true } });
  const responseTeamCount = await RTeamRepository.count();
  const availableResponseTeamCount = await RTeamRepository.count({ where: { status: false } });
  const request = await RequestRepository.find({ where: { time_arrived: Not(IsNull()) }});
  let totalDifference = 0
  request.forEach((request) => {
    const diff = 0
  })
  res.render("overview", {
    layout: "index",
    data: {
      incomingRequestCount,
      approvedRequestCount,
      responseTeamCount,
      availableResponseTeamCount,
    },
  });
});

// render incoming page
server.get("/admin/incoming", async (req, res) => {
  const requests = await RequestRepository.find({
    order: {
      created_at: "DESC",
    },
    where: { approved: false },
  });

  const rteam = await RTeamRepository.find({ where: { status: false } });
  res.render("incoming", { layout: "index", data: { requests, rteam } });
});

// render approved page
server.get("/admin/approved", async (req, res) => {
  const requests = await RequestRepository.find({
    order: {
      created_at: "DESC",
    },
    relations: {
      rteam: true,
    },
    where: { approved: true },
  });

  res.render("approved", { layout: "index", data: { requests } });
});

// render history page
server.get("/admin/history", async (req, res) => {
  const requests = await RequestRepository.find({
    order: {
      created_at: "DESC",
    },
    relations: { rteam: true}
  });
  res.render("history", { layout: "index", data: { requests } });
});


//render rteam page
server.get("/rteam", async (req, res) => {
  const availableResponseTeam = await RTeamRepository.find();
  res.render("rteam", { layout: "index", data: { availableResponseTeam } });
});

//render redirects to rteam details page
server.post("/rteam", async (req, res) => {
  const rteamId = req.body.rteam;
  res.redirect(`/rteam/${rteamId}`);
});

// the rteam details page
server.get("/rteam/:id", async (req, res) => {
  const rteamId = req.params.id;
  const rteamDetails = await RTeamRepository.findOne({
    where: { id: Number(rteamId) },
    relations: { requests: true },
  });

  // console.log(rteamDetails);

  res.render("rteam-assigned-request", { layout: "index", data: { rteamDetails } });
});

// the rteam details page form submits to this route
server.post("/update-request", async (req, res) => {
  // we destructure the values of the Request Body
  const { time_arrived, put_out, request } = req.body;

  // if time_arrived is not undefined, we update the Request with the current date
  if (time_arrived) {
    await RequestRepository.update({ id: Number(request) }, { time_arrived: new Date() });
  }

  // if put out is not undefined, we set it to true and remove the the response
  // team assigned  to this request
  if (put_out) {
    await RequestRepository.update(
      { id: Number(request) },
      { put_out: Boolean(put_out), rteam: null },
    );
  }

  // console.log({ time_arrived, put_out, request });

  res.redirect("/rteam");
});

//render requestdetails page
server.get("/admin/incoming/:id", async (req, res) => {
  const requestId = req.params.id;
  const requestDetails = await RequestRepository.findOne({ where: { id: Number(requestId) } });
  const availableResponseTeam = await RTeamRepository.find({ where: { status: false } });

  res.render("requestdetails", {
    layout: "index",
    data: { requestDetails, availableResponseTeam },
  });
});

// this the route that handles the form sent from the assign rteam page
server.post("/rteam/assign", async (req, res) => {
  // we destructure each field of the form
  const { rteam, requestId } = req.body;

  // Get the response team we want to assign
  const team = (await RTeamRepository.findOne({ where: { id: Number(rteam) } })) as RTeamEntity;

  // assign the team to that specific request and also update the approved status to "TRUE"
  await RequestRepository.update({ id: Number(requestId) }, { approved: true, rteam: team });

  // update the response team status to "FALSE" indicating that they have been assigned
  await RTeamRepository.update({ id: team.id }, { status: true });

  // redirect to approved emergencies page
  res.redirect("/admin/approved");
});

// This route handles a POST request to /request
// The callback function creates a new request in the database
server.post("/request", async (req, res) => {
  const { latitude, longitude } = req.body;
  const entity = RequestRepository.create({ latitude, longitude });
  const request = await RequestRepository.save(entity);
  return res.status(200).json({
    status: true,
    message: "A Response Team has been Deployed to your Location",
    data: request,
  });
});

//create new response team
server.post("/response-team", async (req, res) => {
  // console.log(req.body);
  const { name } = req.body;
  const fstation = await FStationRepository.findOneBy({ id: 1 });
  const entity = RTeamRepository.create({ name, station: fstation! });
  await RTeamRepository.save(entity);
  res.redirect("/admin/overview");
});

server.listen(8082, function () {
  console.log("server running");
});
