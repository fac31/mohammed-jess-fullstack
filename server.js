const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "public/html/about.html"));
});

app.listen(4000, () => {
  console.log("server is running");
});
