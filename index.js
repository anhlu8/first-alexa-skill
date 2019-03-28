const express = require("express");
const bodyParser = require("body-parser");
const plantIt = require("./planit-handler");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello world from Alexa"));

app.post("/planit", (req, res) => {
  plantIt.process(req, res);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
