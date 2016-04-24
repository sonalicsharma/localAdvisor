var express = require('express');
var mongojs=require ("mongojs");
var db=mongojs('LocalAdvisor', ['favorites']);
var router = express.Router();

router.get('/', function(req, res) {
  console.log(req.query);
  db.favorites.find(req.query,function(err,doc){
    res.json(doc);
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  db.favorites.insert(req.body,function(err,doc){
    res.json(doc);
  });
});

router.delete('/:_id', function(req, res) {
  console.log(req.params);
  db.favorites.remove({_id: db.ObjectId(req.params._id)},function(err,doc){
    res.json(doc);
  });
});
module.exports = router;
