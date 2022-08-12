const Student = require("../models/student");
const { check, validationResult } = require("express-validator");
const student = require("../models/student");
const detail = require("../Studentdetail.json").data;

exports.isteacher = (req, res, next) => {
  for (let i = 0; i < 10; i++) {
    const element = detail[i];
    if (element.email == req.body.email && element.role == 1) {
      return next();
    }
  }
  return res.status(400).json({
    message: "You are not teacher leave the Lobby",
  });
};

exports.getStudents = (req, res, next) => {
  let elements = [];
  for (let i = 0; i < 7; i++) {
    const element = detail[i];
    // console.log(element);
    // res.json(element.role == 0);
    if (element.role == 0) {
      console.log(element);
      elements.push(element);
    }
  }

  return res.status(400).json(elements);
};
