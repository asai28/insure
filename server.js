var express = require("express");
var bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", (req, res)=>{
    res.json("Hello from server");
});

app.listen(PORT,function(){`Listening to port ${PORT}`});