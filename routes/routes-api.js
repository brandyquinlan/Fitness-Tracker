const express = require('express');
const mongoose = require("mongoose");
const db = require("../models/Workout.js");
const router = require("express").Router();

  router.get('/api/workouts', async (req, res) => {
    try {
      const workouts = await db.Workout.find({});
      res.send(workouts);;
    }
    catch (err) {
      res.json(err);
    };
  });

  router.put('/api/workouts/:id', async ({ body, params }, res) => {
    await db.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post("/api/workouts", async ({ body }, res) => {
  await db.Workout.create(body)
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

router.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
  .then(() => {
    res.json(true);
  })
  .catch(err => {
    res.json(err);
  });
});

module.exports = router;
