require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middlewares/auth");
module.exports = router;

const validationList = [
  {
    user: process.env.LOGIN_USER,
    password: process.env.LOGIN_PASSWORD,
  },
];

// has to go in database
let tokenList = [];

router.post("/login", (req, res) => {
  if (!req.body.user || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Bad Request, provide valid user and password" });
  }
  if (
    validationList.find(
      (user) =>
        user.user === req.body.user && user.password === req.body.password
    )
  ) {
    const user = { name: req.body.user };
    const accessToken = generateToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
    tokenList.push(refreshToken);
    return res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  return res
    .status(403)
    .json({ message: "User not verified. Please contact admin" });
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).send("Unauthorized");
  }
  if (!tokenList.includes(refreshToken)) {
    return res.status(403).send("Forbidden");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) => {
    if (error) {
      return res.status(403).send("Token error");
    }
    const accessToken = generateToken({ name: user.user });
    return res.status(200).json({ accessToken: accessToken });
  });
});

router.delete("/logout", (req, res) => {
  tokenList = tokenList.filter((token) => token !== req.body.token);
  return res.status(204).send("Logged out");
});
