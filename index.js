//server
//npm install express
//npm install nedb
//npm install node-fetch@2.6.0
//npm install dotenv

const Datastore = require("nedb");
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.listen(3000, () => console.log("listning at 3000"));

//server understands static and json
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

//create database
const database = new Datastore("database.db");
database.loadDatabase();

//server accepts get requests
app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      console.log(err.message);
      return;
    }
    res.json(data);
  });
});

//server accepts post requests
app.post("/api", (req, res) => {
  console.log("Request received");
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  res.json(data);
});

//Server accepts get request from client
//Getting api parameters lat lon
app.get("/weather/:latlon", async (req, res) => {
  //console.log(req.params);
  const latlon = req.params.latlon.split(",");
  const lat = latlon[0];
  const lon = latlon[1];

  //proxy - Send second get request to openweathermapAPI
  //API_KEY in .env -> process.env
  const api_key = process.env.API_KEY;
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const weather_response = await fetch(weather_url);
  const weather_json = await weather_response.json();

  //Send get request to openaqAPI
  const air_url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}`;
  const air_response = await fetch(air_url);
  const air_json = await air_response.json();

  //combine both responsese into object
  const data = {
    weather: weather_json,
    air: air_json,
  };

  res.json(data);
});
