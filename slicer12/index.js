const express = require("express");
const url = require("url");
const app = express();
const fs = require("fs");
var cors = require("cors");
var rand;
var category;
const port = process.env.PORT || 5005;
const sportsdata = JSON.parse(fs.readFileSync("./sports.json", "utf8"));
const dogsdata = JSON.parse(fs.readFileSync("./dogs.json", "utf8"));
const naturedata = JSON.parse(fs.readFileSync("./nature.json", "utf8"));
const urbandata = JSON.parse(fs.readFileSync("./urban.json", "utf8"));
const carsdata = JSON.parse(fs.readFileSync("./cars.json", "utf8"));
const catsdata = JSON.parse(fs.readFileSync("./cats.json", "utf8"));
const covid19data = JSON.parse(fs.readFileSync("./covid19.json", "utf8"));

const categorydata = {
  sports: sportsdata,
  dogs: dogsdata,
  nature: naturedata,
  urban: urbandata,
  cars: carsdata,
  cats: catsdata,
  covid19: covid19data,
};

app.use(cors());

const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  // console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/server_launcher", (req, res) => {
  var queryData = url.parse(req.url, true).query;
  res.send({ data: categorydata[queryData.cat] });
});

app.get("/image_slicer", (req, res) => {
  var queryData = url.parse(req.url, true).query;
  rand = Math.floor(Math.random() * 30);
  console.log(queryData.cat, queryData.gs);
  category = queryData.cat;
  res.send({
    datalist: categorydata[queryData.cat][queryData.gs][rand]["datalist"],
  });
});
