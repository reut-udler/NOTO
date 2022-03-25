const jwt = require("jsonwebtoken");
const config = require("config");

function authMw(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    const payload = jwt.verify(token, config.get("jwtKey"));
    req.user = payload;
    next();
  } catch (err) {
    res.send("Invalid token.");
  }
}

module.exports = authMw;
