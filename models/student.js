var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    no: {
      type: Number,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    joinyear: {
      type: Number,
      required: true,
      unique: true,
    },
    endyear: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
