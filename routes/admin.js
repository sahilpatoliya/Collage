var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  isadmin,
  updatestudent,
  deletestudent,
} = require("../controllers/admin");
const { findByIdAndRemove } = require("../models/student");

//admin access
router.get("/login/admin", isadmin, (req, res) => {
  res.send("You are a admin");
});

//update student
router.put("/update/student", updatestudent);

//delete student
router.delete("/delete/student", deletestudent);
module.exports = router;
