var express = require("express");
var sql = require("sql");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var PORT = 3001;

app.get("/", (req, res)=>{
    res.send("Hello from server");
});

app.listen(PORT,function(){`Listening to port ${PORT}`});