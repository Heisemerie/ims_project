const express = require('express')
const { engine } = require("express-handlebars")


const server = express();

server.set('view engine', 'handlebars');

server.engine('handlebars', engine({
    layoutsDir: __dirname + "/views/layouts"
}));

server.use(express.static('public'))


server.get('/',function(req, res){
    res.render("main", { layout: "index"})
})


server.listen(8080,function(){
    console.log("server running")
})