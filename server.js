const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const db = require('./models');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// // routes
app.use(require("./routes/routes-api"));
app.use(require("./routes/routes-html"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
