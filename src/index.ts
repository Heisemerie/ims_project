import express from "express";
import { engine } from "express-handlebars";
import { connect } from "./database/sql";
import "dotenv/config";
import path from "path";
import { RequestRepository } from "./repositories/request.repository";

const server = express();
connect();
server.set("view engine", "handlebars");

server.engine(
  "handlebars",
  engine({
    layoutsDir: __dirname + "/../views/layouts",
  }),
);

server.use(express.static(path.join(__dirname, "..", "public")));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", function (req, res) {
  res.render("caller", { layout: "index" });
});

server.get("/admin/incoming", (req, res) => {
  res.render("incoming", { layout: "index" });
});

server.get("/admin/overview", (req, res) => {
  res.render("overview", { layout: "index" });
});

server.get("/admin/approved", (req, res) => {
  res.render("approved", { layout: "index" });
});

server.get("/admin/history", (req, res) => {
  res.render("history", { layout: "index" });
});

// This route handles a POST request to /request
// The callback function creates a new request in the database
server.post("/request", async (req, res) => {
  const { latitude, longitude } = req.body;
  const entity = RequestRepository.create({ latitude, longitude });
  const request = await RequestRepository.save(entity);
  return res.status(200).json({
    status: true,
    message: "We are assigning a driver to your location ASAP",
    data: request,
  });
});

server.listen(8082, function () {
  console.log("server running");
});
