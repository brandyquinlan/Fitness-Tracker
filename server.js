const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const db = require('./models');

const PORT = process.env.PORT || 8000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get('/api/workouts', async(req, res) => {
  try {
    const workouts = await db.Workout.find({});
    res.send(workouts);;
  }
  catch(err){
      res.json(err);
    };
});

// // routes
// app.use(require("./routes/routes"));
// // const routes = require('./routes/routes');

// routes
// app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
