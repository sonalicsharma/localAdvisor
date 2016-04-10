var express = require('express');
var eventful = require('eventful-node');

var router = express.Router();
var client = new eventful.Client('PZxv3hdFHxKLvfv3');

/* GET users listing. */
router.get('/:location', function(req, res, next) {
  client.searchEvents({ keywords: 'music', location: req.params.location }, function(err, data){
    if(err){
      return console.error(err);
    }
	console.log(data);
    console.log('Recieved ' + data.search.total_items + ' events');
    console.log('Event listings: ');
    //print the title of each event 
    for(var i in data.search.events.event){
      console.log(data.search.events.event[i].title);
    }
	res.send(data.search.events.event);
  });
});

module.exports = router;
