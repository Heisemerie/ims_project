import express from "express"
import {engine} from "express-handlebars"
import { connect } from "./database/sql";
import "dotenv/config"

const server = express();
// connect()
server.set('view engine', 'handlebars');

server.engine('handlebars', engine({
    layoutsDir: __dirname + "/views/layouts"
}));

server.use(express.static('public'))


server.get('/',function(req, res){
    res.render("main", { layout: "index"})
})


server.listen(8082,function(){
    console.log("server running")
})