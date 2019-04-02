const generateSpeechResponse = (speech, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: speech
    },
    shouldEndSession: shouldEndSession
  };
};

const generateFinalOutput = (response, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes,
    response
  };
};

const handlePlanMyTrip = (event, res) => {
  if (
    event.request.dialogState === "STARTED" ||
    event.request.dialogState === "IN_PROGRESS"
  ) {
    const fromCityValue = event.request.intent.slots.fromCity.value;
    if (fromCityValue && fromCityValue === "mars") {
      const output = {
        version: "1.0",
        sessionAttributes: {},
        response: {
          outputSpeech: {
            type: "PlainText",
            text:
              "This is an invalid city name. From where did you want to start your trip?"
          },
          shouldEndSession: false,
          directives: [
            {
              type: "Dialog.ElicitSlot",
              slotToElicit: "fromCity",
              updatedIntent: {
                name: "PlanMyTrip",
                confirmationStatus: "NONE",
                slots: {
                  toCity: {
                    name: "toCity",
                    confirmationStatus: "NONE"
                  },
                  travelDate: {
                    name: "travelDate",
                    confirmationStatus: "NONE",
                    value: "2017-04-21"
                  },
                  fromCity: {
                    name: "fromCity",
                    confirmationStatus: "NONE"
                  },
                  activity: {
                    name: "activity",
                    confirmationStatus: "NONE"
                  },
                  travelMode: {
                    name: "travelMode",
                    confirmationStatus: "NONE"
                  }
                }
              }
            }
          ]
        }
      };
      res.send(output);
    } else {
      const response = {
        outputSpeech: null,
        card: null,
        directives: [
          {
            type: "Dialog.Delegate" //This tells Alexa to fill up the slots
          }
        ],
        reprompt: null,
        shouldEndSession: false
      };
      const sessionAttributes = {};
      const output = generateFinalOutput(response, sessionAttributes);
      res.send(output);
    }
  } else if (event.request.dialogState === "COMPLETED") {
    const fromCity = event.request.intent.slots.fromCity.value;
    const toCity = event.request.intent.slots.toCity.value;
    const travelDate = event.request.intent.slots.travelDate.value;
    const endSession = true;
    //some business to save to the db or something else
    const speech = `Your travel iterary is from ${fromCity} to ${toCity} on ${travelDate}`;
    const response = generateSpeechResponse(speech, endSession);
    const sessionAttributes = {};
    const output = generateFinalOutput(response, sessionAttributes);
    res.send(output);
  }
};

const processLaunchRequest = (event, res) => {
  //   console.log("event for processLaunchRequest on line 20", event);
  const greeting = "Welcome to plan my trip. You can say help me plan my trip";
  const endSession = false;
  const response = generateSpeechResponse(greeting, endSession);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
};

const processStopIntent = res => {
  const speech = "Thank you for using Plan My Trip. Good bye";
  const endSession = true;
  const response = generateSpeechResponse(speech, endSession);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
};

const processHelpIntent = res => {
  const speech =
    "You can say help me plan my trip or you can say something like I wish to visit California from Philadelphia tomorrow";
  const endSession = false;
  const response = generateSpeechResponse(speech, endSession);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
};

const processIntentRequest = (event, res) => {
  switch (event.request.intent.name) {
    // case "AMAZON.FallbackIntent":
    //   break;
    case "AMAZON.CancelIntent":
      processStopIntent(res);
      break;
    case "AMAZON.HelpIntent":
      processHelpIntent(res);
      break;
    case "AMAZON.StopIntent":
      processStopIntent(res);
      break;
    // case "AMAZON.NavigateHomeIntent":
    //   break;
    case "PlanMyTrip":
      handlePlanMyTrip(event, res);
      break;
  }
};

const processSessionEnded = (event, res) => {
  console.log("***THE SESSION HAS ENDED***");
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
