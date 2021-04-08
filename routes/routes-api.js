const express = require('express');
const mongoose = require("mongoose");
const db = require("../models/Workout.js");
const router = require("express").Router();

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

router.get('/api/workouts/range', async (req, res) => {
  try {
    await db.Workout.aggregate([{
      $match: {
        day: {
          $gte: new (Date)
        }
      }
    },
    {
      $addFields: {
        totalDuration: {
          $sum: "exercises.duration"
        }
      }
    }
    ])
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
    }
      catch (err) {
        res.json(err);
      };
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
