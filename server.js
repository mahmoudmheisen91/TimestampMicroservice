// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API endpoint...
app.get("/api/timestamp/:date_string?", (req, res) => {
  let req_date = req.params.date_string;
  if (+req_date) req_date = +req_date;

  let date = new Date();
  if (req_date) date = new Date(req_date);

  let obj = { unix: date.getTime(), utc: date.toUTCString() };
  if (!date.getTime()) obj = { error: "Invalid Date" };

  res.json(obj);
});

app.use(express.urlencoded());
app.post('/submit-form', (req, res) => {
  let req_date = req.body.stamp;
  if (+req_date) req_date = +req_date;

  let date = new Date();
  if (req_date) date = new Date(req_date);

  let obj = { unix: date.getTime(), utc: date.toUTCString() };
  if (!date.getTime()) obj = { error: "Invalid Date" };

  res.json(obj);
  res.end();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
