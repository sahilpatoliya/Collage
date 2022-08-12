require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//my routes
const authroutes = require("./routes/auth");
const teacherroutes = require("./routes/teacher");
const adminroutes = require("./routes/admin");
//db connection
mongoose
  .connect(
    process.env.DATABASE,

    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch(console.log("DB is not connected"));
// this is my middlwer
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authroutes);
app.use("/api", teacherroutes);
app.use("/api", adminroutes);
//port
const port = process.env.PORT || 3300;

//starting server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
