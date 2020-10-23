const hyperId = require("hyperid");

function authentication(req, res, next) {
  //'Bearer MRhCQLmDTGeEo81oYwtlHA/0'
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(" ")[1];
    const isValidToken = hyperId.decode(token);
    if (isValidToken) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = authentication;
