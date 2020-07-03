const express = require("express");
const imageToSlices = require("image-to-slices");
const url = require("url");
const app = express();
const fs = require("fs");
const Canvas = require("canvas");
const Clipper = require("image-clipper");
var cors = require("cors");

var img = new Canvas.Image();

const port = process.env.PORT || 5005;

var lineXArray = [];

var lineYArray = [];

var source =
  "https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

const categoriesname = [
  "sports",
  "dogs",
  "nature",
  "urban",
  "cars",
  "cats",
  "covid19",
];

var cars_data = JSON.parse(fs.readFileSync("./cars.json", "utf8"));
// const filenames=["./sportsregurls"
// ,"./dogsregurls.txt"
//  , "./natureregurls.txt"
//  ,"./urbanregurls.txt"
//  ,"./carsregurls.txt"
// ,"./catsregurls.txt"
//, "./covid19regurls.txt"]

const sportsdata = fs.readFileSync("./sportsregurls.txt", "UTF-8");

const dogsdata = fs.readFileSync("./dogsregurls.txt", "UTF-8");

const naturedata = fs.readFileSync("./natureregurls.txt", "UTF-8");

const urbandata = fs.readFileSync("./urbanregurls.txt", "UTF-8");

const carsdata = fs.readFileSync("./carsregurls.txt", "UTF-8");

const catsdata = fs.readFileSync("./catsregurls.txt", "UTF-8");

const covid19data = fs.readFileSync("./covid19regurls.txt", "UTF-8");

const moviesdata = fs.readFileSync("./moviesregurls.txt", "UTF-8");

var lines;

const categorydata = {
  sports: {
    urls: [],
  },
  dogs: {
    urls: [],
  },
  nature: {
    urls: [],
  },
  urban: {
    urls: [],
  },
  cars: {
    urls: [],
  },
  cats: {
    urls: [],
  },
  covid19: {
    urls: [],
  },
  movies: {
    urls: [],
  },
};

app.use(cors());

try {
  // print all lines

  lines = sportsdata.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["sports"].urls.push(line);
  });
  lines = dogsdata.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["dogs"].urls.push(line);
    console.log(categorydata["dogs"].urls);
  });
  lines = naturedata.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["nature"].urls.push(line);
  });
  lines = urbandata.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["urban"].urls.push(line);
  });
  lines = carsdata.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["cars"].urls.push(line);
  });
  lines = catsdata.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["cats"].urls.push(line);
  });
  lines = covid19data.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["covid19"].urls.push(line);
  });
  lines = moviesdata.split(/\r?\n/);
  lines.forEach((line) => {
    categorydata["movies"].urls.push(line);
  });
} catch (err) {
  console.error(err);
}

img.src = source;

const server = app.listen(port, "192.168.0.50", function () {
  const host = server.address().address;

  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

function slicecoordinates(querydata) {
  let n = querydata.gs;

  img.src = source;

  lineXArray = [];

  lineYArray = [];

  console.log("grid size is ", n);

  if (n == 3 || n == 4 || n == 5) {
    let hind = img.height / n;

    let wind = img.width / n;

    for (let index = 1; index < querydata.gs; index++) {
      lineYArray.push(hind * index);
    }

    for (let index = 1; index < querydata.gs; index++) {
      lineXArray.push(wind * index);
    }

    let t = { lineXArray, lineYArray };

    console.log(t);

    return t;
  }
}

app.get("/server_launcher", (req, res) => {
  console.log("Backend called");
  img.src =
    "https://images.unsplash.com/photo-1570976175275-bb198ecb4571?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzODk5MH0";

  img.onload = function () {
    console.log(img.height, " ", img.width);
  };

  Clipper(
    "https://images.unsplash.com/photo-1570976175275-bb198ecb4571?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzODk5MH0",
    function () {
      this.crop(20, 20, 100, 100)
        .resize(50, 50)
        .quality(80)
        .toFile("./result.jpg", function () {
          console.log("saved!");
        });
    }
  );

  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
app.get("/get_image", (req, res) => {
  console.log(source);
  res.send({ imgsource: source });
});

app.get("/image_slicer", (req, res) => {
  var queryData = url.parse(req.url, true).query;
  let rand = Math.floor(
    Math.random() * categorydata[queryData.cat].urls.length
  );
  source = categorydata[queryData.cat].urls[rand];
  console.log("Slicer called");

  res.send({ datalist: cars_data[3][rand]["datalist"] });

  let f = slicecoordinates(queryData);
  console.log();
  imageToSlices.configure({
    clipperOptions: {
      canvas: Canvas,
    },
  });

  //   imageToSlices(
  //     source,
  //     f.lineXArray,
  //     f.lineYArray,
  //     {
  //       saveToDir: "./assets/splitted_images",
  //       saveToDataUrl: true,
  //     },
  //     function (dataUrlList) {
  //       console.log("IMAGE SLICER OUTPUT------", dataUrlList.length);
  //       res.send({ datalist: dataUrlList });
  //       console.log("the source image has been sliced into sections!");
  //     }
  //   );
});
