var request = require('request');

var baseSunriseURL = "http://api.sunrise-sunset.org/json?";
var baseAstroURL = "http://api.usno.navy.mil/";
var baseWeatherURL = "api.openweathermap.org/data/2.5/weather?";

function QuerySunrise(lat, long, date){
  var url = baseSunriseURL + "lat=" + lat + "&lng=" + long
  var sunrise = "null";
  request({
    url: url,
    json: true
  }, function(error, response, body)  {
        if(!error && response.statusCode === 200){
           sunrise = "All good in the hood";
        }
  })
  return sunrise;
}

function QuerySunset(lat, long, date){
}
function QueryMoonPhase(lat, long, date){
}
function QueryNextEclipse(lat, long, date){
}
function QueryGoodGazingNight(lat, long, date){
}

module exports = QuerySunrise, QuerySunset, QueryMoonPhase, QueryNextEclipse, QueryGoodGazingNight;
