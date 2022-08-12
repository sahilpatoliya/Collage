var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { login, authenticated, refauth } = require("../controllers/auth");

let refreshTokens = [];
//login route
router.get("/login", login);

//check your token protected or not
router.post("/protected", authenticated, (req, res) => {
  res.send("inside protected route");
});

//refresh your token routes

router.post("/refreshnewaccesstoken", refauth, (req, res) => {
  res.send(atoken);
});

module.exports = router;
