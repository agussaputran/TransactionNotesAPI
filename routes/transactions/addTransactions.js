const express = require("express");
const app = express.Router();
const db = require("../../controller/dbController");
const authentication = require("../../middleware/authenticationMiddleware");

app.use(authentication);

app.post("/transactions", (req, res) => {
  const body = req.body;
  const result = db.add("transactions", body);
  res.send(result);
});

module.exports = app;
