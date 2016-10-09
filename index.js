var request = require("request");
var moment = require("moment");

var sunbaseURL = "http://api.sunrise-sunset.org/json?";
var moonbaseURL = "http://api.usno.navy.mil/moon/phase?date=";
var weatherbaseURL = "";

var lat = 43.048122;
var long = -76.147424;

var alexa = require('alexa-app');
var app = new alexa.app('astronomer');

app.launch(function(request, response){
  response.say("Welcome to Astronomer! I can tell you when sunrise and sunset are, the current phase of the moon, and conditions for stargazing.");
});

app.intent('GetSunrise',
  function(alexaRequest, alexaResponse){
    var url = sunbaseURL + "lat=" + lat + "&lng=" + long;
    request({
      url: url,
      json: true
    }, function(error, response, body) {
        if(!error && response.statusCode === 200){
          alexaResponse.say("Sunrise for your location will be at " + moment(body.results.sunrise, "HH:mm:ss A").subtract(4, "hours").format('LTS'));
          alexaResponse.send();
        }
    });
    return false;
});

app.intent('GetSunset',
  function(alexaRequest, alexaResponse){
    var url = sunbaseURL + "lat=" + lat + "&lng=" + long;
    request({
      url: url,
      json: true
    }, function(error, response, body) {
        if(!error && response.statusCode === 200){
          alexaResponse.say("Sunset for your location will be at " + moment(body.results.sunset, "HH:mm:ss A").subtract(4, "hours").format('LTS'));
          alexaResponse.send();
        }
    });
    return false;
});

app.intent('GetMoonPhase',
  function(alexaRequest, alexaResponse){
    var url = moonbaseURL + moment().format('I') + "&nump=1";
    request({
      url: url,
      json: true
    }, function(error, response, body) {
        if(!error && response.statusCode === 200){
          alexaResponse.say("The moon is currently in the phase " + body.results.phase);
          alexaResponse.send();
        }
    });
    return false;
});

app.error = function(exception, request, response) {
    response.say("Lol get rekt noob.");
};

exports.handler = app.lambda();
