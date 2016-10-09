var alexa = require('alexa-app');
var app = new alexa.app('astronomer');

app.launch(function(request, response){
  response.say("I can tell you when the sun will rise or set.");
});

app.intent('getsunrise',
  function(request, response){
    sunriseMessage = "Nooooooooon";
    response.say(sunriseMessage);
  }
);

exports.handler = app.lambda();
