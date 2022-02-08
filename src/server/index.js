let fullUrl = {};
const baseurl = "https://api.meaningcloud.com/sentiment-2.1?";
const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const mockAPIResponse = require("./mockAPI.js");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_KEY;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(8081, function () {
  console.log("Server is Working on port 8081!");
});
app.post("/getSentiments", async (req, res) => {
  fullUrl = req.body.url;
  const response = await fetch(
    `${baseurl}key=${apiKey}&url=${fullUrl}&lang=en`
  );
  const apiData = await response.json();
  res.send(apiData);
});
app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
