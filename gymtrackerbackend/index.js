const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors')
app.use(cors())

const Workout = require('./models/workout')

app.get('/api/workouts', (request, response) => {
  Workout.find({})
    .then(workouts => {
      response.json(workouts);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.post('/api/workouts', (request, response) => {
  const body = request.body;

  if (!body.date || !Array.isArray(body.exercises)) {
    return response.status(400).json({ error: 'date or exercises missing or invalid' });
  }

  const workout = new Workout({
    date: body.date,
    exercises: body.exercises,
  });

  workout.save()
    .then(savedWorkout => {
      response.json(savedWorkout);
    })
    .catch(error => {
      response.status(400).json({ error: error.message });
    });
});

app.get('/api/workouts/:id', (request, response) => {
  Workout.findById(request.params.id)
    .then(workout => {
      if (workout) {
        response.json(workout);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.delete('/api/workouts/:id', (request, response) => {
  Workout.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    });
});

app.put('/api/workouts/:id', (request, response, next) => {
  const body = request.body;

  const workout = {
    date: body.date,
    exercises: body.exercises,
  };

  Workout.findByIdAndUpdate(request.params.id, workout, { new: true })
    .then(updatedWorkout => {
      response.json(updatedWorkout);
    })
    .catch(error => next(error));
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})