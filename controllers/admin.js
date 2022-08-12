const { json } = require("body-parser");
const { check, validationResult } = require("express-validator");
const student = require("../models/student");

const detail = require("../Studentdetail.json").data;
const fs = require("fs");

exports.isadmin = (req, res, next) => {
  for (let i = 0; i < 10; i++) {
    const element = detail[i];
    if (element.email == req.body.email && element.role == 2) {
      return next();
    }
  }
  return res.status(400).json({
    message: "You are not admin leave the Lobby",
  });
};

exports.updatestudent = (req, res) => {
  student.findByIdAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, student) => {
      if (err) {
        return res.status(400).json({
          error: "You Are Not Able To Update Data",
        });
      }
      res.json(student);
    }
  );
};

exports.deletestudent = (req, res) => {
  student.findByIdAndRemove(req.body._id, function (err) {
    if (err) {
      res.send("not Success fully remove");
    } else {
      res.send("successfully deleted");
    }
  });
};
