var express= require ("express");
var app= express();
//var mongojs=require ("mongojs");
//var db=mongojs('contactlist', ['contactlist']);
//var bodyParser=require('body-parser');

app.use(express.static(__dirname+ "/public"));
//app.use(bodyParser.json());
app.get('/aa', function(req,res){
  //  console.log("I received a GET request");  
	res.send('maina');
});

app.listen(3001);
console.log("Server running on port 3001");