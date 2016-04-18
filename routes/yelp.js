var express = require('express');
var router = express.Router();

var Yelp = require('yelp');
 
var yelp = new Yelp({
  consumer_key: 'v4a8ZgfYs31Pk4L-P_TJsg',
  consumer_secret: '3igIQi_QcPt77MDQC-Q4rD7QMTA',
  token: 'T9HG0GKl2V0lKFHkGGcMEgcUXvHYqJfm',
  token_secret: 'ybJeQ2ZZMsmGwfWg2U_6XkFwaLI',
});

router.get('/:term/:location', function(req, res, next) {
  yelp.search({ term: req.params.term, location: req.params.location, limit: 5})
  .then(function (data) {
	res.send(data.businesses);
  })
  .catch(function (err) {
    console.error(err);
	res.send(err);
  });
});

module.exports = router;
