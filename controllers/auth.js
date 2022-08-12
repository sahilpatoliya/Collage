const Student = require("../models/student");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const student = require("../models/student");
const detail = require("../Studentdetail.json").data;
let refreshTokens = [];

//login
exports.login = (req, res) => {
  for (let i = 0; i < 7; i++) {
    const element = detail[i];

    if (element.email == req.body.email) {
      //create access token
      let atoken = jwt.sign(
        { email: student.email },
        "access",
        { expiresIn: "5s" },
        process.env.SECRET
      );
      //create  refresh token
      let refreshToken = jwt.sign(
        { email: student.email },
        "refresh",
        { expiresIn: "8h" },
        process.env.SECRET
      );
      refreshTokens.push(refreshToken);

      res.status(201).json({
        atoken,
        refreshToken,
      });
    }
    res.status(400).json({
      message: "You are not Student leave the Lobby",
    });
  }
};

//how to authenticate

exports.authenticated = (req, res, next) => {
  const token = req.headers.authorization;
  const authtoken = token.split(" ")[1]; // access token

  jwt.verify(authtoken, "access", (err, user) => {
    if (!err) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ message: "User not Authenticated here" });
    }
  });
};

//token auth

exports.refauth = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "student is not Authenticated" });
  }

  jwt.verify(refreshToken, "refresh", (err, student) => {
    if (!err) {
      console.log(err);
      const atoken = jwt.sign({ email: student.email }, "access", {
        expiresIn: "1d",
      });
      console.log(err);
      return res.status(201).json({ atoken });
    } else {
      return res.status(403).json({ message: "student Not Authenticated" });
    }
  });
};
