require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middlewares/auth");
module.exports = router;

const validationList = [
  {
    user: "admin",
    password: "password",
  },
];

// has to go in database
const refreshList = [];

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
    refreshList.push(refreshToken);
    return res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  return res
    .status(403)
    .json({ message: "User not verified. Please contact admin" });
});
