var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { isteacher, getStudents } = require("../controllers/teacher");
const detail = require("../Studentdetail.json").data;
let elements = [];

//login route
router.get("/login/teacher", isteacher, (req, res) => {
  res.send("You are a teacher");
});

//get all student
router.get("/Students/teacher", isteacher, getStudents);

module.exports = router;
