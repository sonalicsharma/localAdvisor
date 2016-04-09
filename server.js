var express= require ("express");
var app= express();
//var mongojs=require ("mongojs");
//var db=mongojs('contactlist', ['contactlist']);
//var bodyParser=require('body-parser');

app.use(express.static(__dirname+ "/public"));
app.use("/bower_components", express.static(__dirname+ "/bower_components"));
//app.use(bodyParser.json());


app.listen(3001);
console.log("Server running on port 3001");