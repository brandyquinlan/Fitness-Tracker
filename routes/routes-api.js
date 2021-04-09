// const express = require('express');
// const mongoose = require("mongoose");
const db = require("../models/Workout.js");
const router = require("express").Router();

router.put('/api/workouts/:id', ({ body, params }, res) => {
  db.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 })
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
