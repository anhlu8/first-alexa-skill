generateSpeechResponse = (speech, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: speech
    },
    shouldEndSession: shouldEndSession
  };
};

generateFinalOutput = (response, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes,
    response
  };
};

handlePlanMyTrip = (event, response) => {};

processLaunchRequest = (event, res) => {
  //   console.log("event for processLaunchRequest on line 20", event);
  const greeting = "Welcome to plan my trip. You can say help me plan my trip";
  const endSession = false;
  const response = generateSpeechResponse(greeting, endSession);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
};

processIntentRequest = (event, res) => {
  console.log("event for processIntentRequest on line 30", event);
  switch (event.request.intent.name) {
    case "AMAZON.FallbackIntent":
      break;
    case "AMAZON.CancelIntent":
      break;
    case "AMAZON.HelpIntent":
      break;
    case "AMAZON.StopIntent":
      break;
    case "AMAZON.NavigateHomeIntent":
      break;
    case "PlanMyTrip":
      handlePlanMyTrip(event, res);
      break;
  }
};

processSessionEnded = (event, res) => {
  console.log("event for processSessionEnded on line 34", event);
};

exports.process = (req, res) => {
  //   console.log("this is the request on line 38", req);
  let event = req.body;
  switch (event.request.type) {
    case "LaunchRequest":
      processLaunchRequest(event, res);
      break;
    case "IntentRequest":
      processIntentRequest(event, res);
      break;
    case "SessionEndedRequest":
      processSessionEnded(event, res);
      break;
  }
};
