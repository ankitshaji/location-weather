//server
//npm install express
//npm install nedb
//npm install node-fetch@2.6.0
const Datastore = require("nedb");
const express = require("express");
const fetch = require("node-fetch");

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
//-proxy - send another get request to openweathermapAPI
app.get("/weather/:latlon", async (req, res) => {
  //console.log(req.params);
  const latlon = req.params.latlon.split(",");
  const lat = latlon[0];
  const lon = latlon[1];
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88c2effb12e5ac44a65f792548034497`;
  //send second get request to openweathermapAPI
  const response1 = await fetch(api_url);
  const json1 = await response1.json();
  res.json(json1);
});
