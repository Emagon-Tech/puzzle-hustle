const express = require("express");
const clipper = require("image-clipper");

const app = express();
const port = process.env.PORT || 5000;
const imageToSlices = require("image-to-slices");
const lineXArray = [300, 600];
const lineYArray = [300, 600];
const source = "../assets/pinkrose.jpeg";
const server = app.listen(port, "192.168.0.231", function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/server_launcher", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/image_slicer", (req, res) => {
  imageToSlices.configure({
    clipperOptions: {
      canvas: require("canvas"),
    },
  });

  imageToSlices(
    source,
    lineXArray,
    lineYArray,
    {
      saveToDataUrl: true,
    },
    function (dataUrlList) {
      res.send({ datalist: dataUrlList });
    }
  );
});
