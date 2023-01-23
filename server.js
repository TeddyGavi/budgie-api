const express = require("express");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
// add bodyparser
// cors
// proxy goes into the front end, currently set in the backend.. afraid to touch rn lol

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users/", require("./routes/usersRoute"));

app.listen(3001, function () {
  console.log("express server is running on port 3001");
});
