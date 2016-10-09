var alexa = require('alexa-app');
var app = new alexa.app('astronomer');

app.launch(function(request, response){
  response.say("I can tell you when the sun will rise or set.");
});

app.intent('GetSunriseIntent',
  function(request, response){
    sunriseMessage = "Nooooooooon";
    response.say(sunriseMessage);
  }
);

app.intent('GetSunsetIntent',
  function(request, response){
    sunriseMessage = "None";
    response.say(sunriseMessage);
  }
);

exports.handler = app.lambda();
