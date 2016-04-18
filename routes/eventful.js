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
	var events = data.search.events.event;
	if (events && events.length > 5) {
	  events = events.slice(0, 5);
	}
	res.send(events);
  });
});

module.exports = router;
