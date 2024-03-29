require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const headers = req.headers["authorization"];
  const token = headers && headers.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

function generateToken(user) {
  // expiration time must be adjusted before to deploy
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "30m" });
}

module.exports = { authenticateToken, generateToken };
