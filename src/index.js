/**
 * App ID for the skill
 */
var cuseLocation = (43.0440, -76.1518);

var APP_ID = "amzn1.ask.skill.09b8c667-aa79-4135-8cde-d589c624aaee";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var APIQuery = require('./APIQuery');

var Astronomer = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Astronomer.prototype = Object.create(AlexaSkill.prototype);
Astronomer.prototype.constructor = Astronomer;

Astronomer.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Astronomer onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Astronomer.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Astronomer onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var greetingSpeech = "Welcome to Astronomer.  You can ask me about sunrise, sunset, and other astronomy knowledge.";
    var repromptText = "You can ask me about sunrise, sunset, and other astronomy knowledge";
    response.ask(greetingSpeech, repromptText);
};

Astronomer.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Astronomer onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Astronomer.prototype.intentHandlers = {
    // register custom intent handlers
    "GetSunrise": function (intent, session, response) {
        sunriseSpeech = APIQuery.QuerySunset(cuseLocation[0], cuseLocation[1], Null);
        response.tell(sunriseSpeech);
    },
    "GetSunset": function (intent, session, response){
      sunsetSpeech = "Sunset is at noon today";
      response.tell(sunsetSpeech);
    },
    "GetMoonPhase": function (intent, session, response){
      moonSpeech = "The moon is new.";
      response.tell(moonSpeech);
    },
    "GetNextEclipse": function (intent, session, response){
      meteorSpeech = "Ayy lmao";
      response.tell(meteorSpeech);
    },
    "GetGoodGazingNight": function (intent, session, response){
      gazingSpeech = "It's a great gnight to gaze";
      response.tell(gazingSpeech);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me about sunrise, sunset, and other astronomy knowledge","You can ask me about sunrise, sunset, and other astronomy knowledge");
    },
    "AMAZON.StopIntent": function (intent, session, response){
      response.ask("Goodbye");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var astronomer = new Astronomer();
    astronomer.execute(event, context);
};
