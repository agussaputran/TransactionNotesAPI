const express = require("express");
const app = express.Router();
const db = require("../controller/dbController");
const hyperId = require("hyperid");

app.post("/login", (req, res) => {
  const user = db.get("users", req.body);
  const instance = hyperId();
  const token = instance();

  if (user) {
    user.token = token;
    res.send(user);
  } else {
    res.status(400).send("not found");
  }
});

module.exports = app;
