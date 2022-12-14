const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //get the token from the header if present
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    token = token.split(" ")[1]
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    console.log(ex)
    res.status(400).send("Invalid token.");
  }
};

