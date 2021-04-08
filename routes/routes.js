const express = require('express');
const db = require("../models/workout.js");

module.exports = function (app) {

app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// moved to server.js
// app.get('/api/workouts', async(req, res) => {
//   try {
//     const workouts = await db.Workout.find({});
//     const workoutData = await workouts.json();
//     res.json(workoutData);;
//   }
//   catch(err){
//       res.json(err);
//     };
// });

// app.put('/api/workouts/:id', (req, res) => {
//   db.workout.findById(
//     {
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     (error, data) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(data);
//       }
//     }
//   );
// });


app.post('/api/workouts', ({ body }, res) => {
    const workout = body;
    db.workout.save(workout, (error, saved) => {
      if (error) {
        console.log(error);
      } else {
        res.send(saved);
      }
    });
  });

app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
};
