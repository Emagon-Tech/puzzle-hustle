const express = require("express");

const imageToSlices = require("image-to-slices");

const url = require("url");

const app = express();

const fs = require("fs");

const Canvas = require("canvas");

var Jimp = require("jimp");

var names = ["cars", "cats", "covid19", "dogs", "nature", "urban", "sports"];

var categorydata = {
  sports: {
    "3": [],
    "4": [],
    "5": [],
  },
  dogs: {
    "3": [],
    "4": [],
    "5": [],
  },
  nature: {
    "3": [],
    "4": [],
    "5": [],
  },
  urban: {
    "3": [],
    "4": [],
    "5": [],
  },
  cars: {
    "3": [],
    "4": [],
    "5": [],
  },
  cats: {
    "3": [],
    "4": [],
    "5": [],
  },
  covid19: {
    "3": [],
    "4": [],
    "5": [],
  },
};

function clipping() {
  let objString = JSON.stringify(categorydata.sports);
  fs.writeFileSync("./sports.json", objString);
}

var cors = require("cors");

var img = new Canvas.Image();

const port = process.env.PORT || 5005;

app.use(cors());

const server = app.listen(port, "192.168.0.50", function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/server_launcher", (req, res) => {
  console.log("Backend called");
  clipping();
  res.send({ msg: "saved to json" });
});

app.get("/three", () => {
  fs.readdir("./slicedpics/" + names[6] + "/", function (err, items) {
    console.log(items);

    for (let i = 0; i < items.length; i++) {
      imageToSlices.configure({
        clipperOptions: {
          canvas: Canvas,
        },
      });
      imageToSlices(
        "./slicedpics/" + names[6] + "/" + items[i],
        [300, 600],
        [300, 600],
        {
          saveToDir: "./assets/splitted_images",
          saveToDataUrl: true,
        },
        function (dataUrlList) {
          console.log(
            "=======================================------",
            dataUrlList.length
          );
          categorydata.sports[3].push({ datalist: dataUrlList });
          console.log("categorydata.sports[3]");
        }
      );

      //   console.log(img.width, img.height);
      // if (img.height !== img.width) {
      //   console.log(img.src);
      // }
      //     Jimp.read("./pics/" + names[6] + "/" + items[i], (err, lenna) => {
      //       if (err) throw err;
      //       lenna
      //         .resize(900, 900) // resize
      //         .quality(99) // set JPEG quality
      //         .write("./slicedpics/" + names[6] + "/" + i + ".jpg"); // save
      //       console.log("saved images", i);
      //     });
    }
  });
});

app.get("/four", () => {
  fs.readdir("./slicedpics/" + names[6] + "/", function (err, items) {
    console.log(items);

    for (let i = 0; i < items.length; i++) {
      imageToSlices.configure({
        clipperOptions: {
          canvas: Canvas,
        },
      });
      imageToSlices(
        "./slicedpics/" + names[6] + "/" + items[i],
        [225, 450, 675],
        [225, 450, 675],
        {
          saveToDir: "./assets/splitted_images",
          saveToDataUrl: true,
        },
        function (dataUrlList) {
          console.log(
            "=======================================------",
            dataUrlList.length
          );
          categorydata.sports[4].push({ datalist: dataUrlList });
          console.log("categorydata.cars[4]");
        }
      );
    }
  });
});

app.get("/five", () => {
  fs.readdir("./slicedpics/" + names[6] + "/", function (err, items) {
    console.log(items);

    for (let i = 0; i < items.length; i++) {
      imageToSlices.configure({
        clipperOptions: {
          canvas: Canvas,
        },
      });
      imageToSlices(
        "./slicedpics/" + names[6] + "/" + items[i],
        [180, 360, 540, 720],
        [180, 360, 540, 720],
        {
          saveToDir: "./assets/splitted_images",
          saveToDataUrl: true,
        },
        function (dataUrlList) {
          console.log(
            "=======================================------",
            dataUrlList.length
          );
          categorydata.sports[5].push({ datalist: dataUrlList });
          console.log("categorydata.cars[5]");
        }
      );
    }
  });
});

app.get("/image_slicer", (req, res) => {
  var queryData = url.parse(req.url, true).query;
  let rand = Math.floor(
    Math.random() * categorydata[queryData.cat].urls.length
  );
  source = categorydata[queryData.cat].urls[rand];

  let f = slicecoordinates(queryData);
  console.log();
  imageToSlices.configure({
    clipperOptions: {
      canvas: Canvas,
    },
  });
  imageToSlices(
    "./lena-small-bw.jpg",
    [180, 360, 540, 720],
    [180, 360, 540, 720],
    {
      saveToDir: "./assets/splitted_images",
      saveToDataUrl: true,
    },
    function (dataUrlList) {
      res.send({ datalist: dataUrlList });
    }
  );
});
