var express = require('express');
var mongojs=require ("mongojs");
var db=mongojs('LocalAdvisor', ['Accounts']);
var router = express.Router();

router.post('/', function(req, res) {
  db.Accounts.insert(req.body,function(err,doc){
    //console.log(err);
    res.json(doc);
  });
});

module.exports = router;
