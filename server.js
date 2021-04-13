const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");
const PORT = process.env.PORT || 8000;
const app = express();
const router = require("express").Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(logger("dev"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Route to last workout data
router.get("/api/workouts", (req, res) => {
    const workouts = db.Workout.aggregate([{
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"}
      }
    }])
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);
    });
  });


// Routes
app.use(require("./routes/routes-api"));
app.use(require("./routes/routes-html"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
