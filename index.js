require("request");

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
    var sunriseMessage = "";
    request({
      url: url,
      json: true
    }, function(error, response, body) {
        if(!error && response.statusCode === 200){
          obj = JSON.parse(body);
          sunriseMessage = obj.sunrise;
        }
    });
    response.say(sunriseMessage);
  }
);

app.intent('GetSunset',
  function(request, response){
    var url = sunbaseURL + "lat=" + lat + "&lng=" + long;
    var sunseteMessage = "";
    request({
      url: url,
      json: true
    }, function(error, response, body) {
        if(!error && response.statusCode === 200){
          obj = JSON.parse(body);
          sunriseMessage = obj.sunset;
        }
    });
    response.say(sunsetMessage);
  }
);

exports.handler = app.lambda();
