const express = require("express");
const app = express();
const fs = require("fs");
const jsondata = require("./mockdata.json");

app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.json(jsondata);
});

app.listen(8000, (req, res) => {
  console.log("Server is listening from port 8000");
});
