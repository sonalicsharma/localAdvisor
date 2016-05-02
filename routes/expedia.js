var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');

var STARTDELTA = 6;
var ENDDELTA = 9;
var EXPEDIA_BASE_URL= 'http://terminal2.expedia.com/x/hotels?maxhotels=5&location=';
var API_KEY = 'kEWOTuZkAGQq3d50rfGAEGAsiGd56FFL';
router.get('/:location', function(req, res) {
  var start = moment().add(STARTDELTA, 'days').format('YYYY-MM-DD');
  var end = moment().add(ENDDELTA, 'days').format('YYYY-MM-DD');

  var url = EXPEDIA_BASE_URL + req.params.location + '&radius=5km&dates=' + start + ',' + end + '&apikey=' + API_KEY;
  request(url, function(error, response, body) {
    res.send(JSON.parse(body).HotelInfoList.HotelInfo);
  });
})
module.exports = router;
