var express = require('express');
var router = express.Router();
var request = require('request');
router.get('/:location', function(req, res) {
  request('http://terminal2.expedia.com/x/hotels?maxhotels=5&location=' + req.params.location + '&radius=5km&dates=2016-05-19,2016-05-22&apikey=kEWOTuZkAGQq3d50rfGAEGAsiGd56FFL', function (error, response, body) {
    res.send(JSON.parse(body).HotelInfoList.HotelInfo);
  });
})
module.exports = router;
