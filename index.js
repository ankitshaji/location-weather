//server
//npm install express
//npm install nedb
const Datastore = require("nedb");
const express = require("express");
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
