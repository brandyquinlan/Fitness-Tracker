const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },

  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter a type of exercise"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter the name of the exercise"
      },
      duration: {
        type: Number,
        unique: true,
        required: "Enter the duration of the exercise"
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      }
    }
  ]
},
{
  // add virtual data to results
  toJSON: {
    virtuals: true
  }
}
);

// adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function() {
  // get the sum of the exercise durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;