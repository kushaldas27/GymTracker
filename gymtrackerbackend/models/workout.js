const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const SetSchema = new mongoose.Schema({
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sets: [SetSchema],
});

const WorkoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  exercises: [ExerciseSchema],
});

WorkoutSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Workout', WorkoutSchema)