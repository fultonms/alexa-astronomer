var request = require("request");
var moment = require("moment");

var sunbaseURL = "http://api.sunrise-sunset.org/json?";
var lat = 43.048122;
var long = -76.147424;

var alexa = require('alexa-app');
var app = new alexa.app('astronomer');

app.launch(function(request, response){
  response.say("I can tell you when the sun will rise or set.");
});

app.intent('GetSunrise',
  function(request, response){
    var url = sunbaseURL + "lat=" + lat + "&lng=" + long;

    var sunriseMessage = request({
      url: url,
      json: true
    }, function(error, resp, body) {
        if(!error && resp.statusCode === 200){
          response.say(moment(body.results.sunrise, "HH:mm:ss A").subtract(4, "hours").format('LTS'));
        }
    });
  }
);

app.intent('GetSunset',
  function(request, response){
    var url = sunbaseURL + "lat=" + lat + "&lng=" + long;
    var sunseteMessage =request({
      url: url,
      json: true
    }, function(error, resp, body) {
        if(!error && resp.statusCode === 200){
          response.say(moment(body.results.sunset, "HH:mm:ss A").subtract(4, "hours").format('LTS'));
        }
    });
  }
);

exports.handler = app.lambda();
