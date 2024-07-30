import React, { useState } from 'react'
import WorkoutForm from './WorkoutForm'
import ExerciseForm from './ExerciseForm'
import SetForm from './SetForm'

const WorkoutLogger = () => {
  const [workout, setWorkout] = useState(null)
  const [currentExercise, setCurrentExercise] = useState(null)

  const handleWorkoutSubmit = (data) => {
    setWorkout(data)
  };

  const handleExerciseSubmit = (data) => {
    setCurrentExercise(data)
  };

  const handleSetSubmit = (sets) => {
    const updatedExercise = { ...currentExercise, sets }
    const updatedWorkout = {...workout,
      exercises: [...workout.exercises, updatedExercise],
    };
    setWorkout(updatedWorkout)
    setCurrentExercise(null)
  }

  const handleSubmitWorkout = () => {
    // send the workout data to backend
    console.log(workout)
  }

  return (
    <div>
      {!workout && <WorkoutForm onSubmit={handleWorkoutSubmit} />}
      {workout && !currentExercise && (
        <div>
          <h2>Workout Date: {workout.date}</h2>
          <ExerciseForm onSubmit={handleExerciseSubmit} />
          <ul>
            {workout.exercises.map((exercise, index) => (
              <li key={index}>
                <strong>{exercise.name}</strong>
                <ul>
                  {exercise.sets.map((set, setIndex) => (
                    <li key={setIndex}>
                      Set {setIndex + 1}: Reps: {set.reps}, Weight: {set.weight}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitWorkout}>Submit Workout</button>
        </div>
      )}
      {currentExercise && <SetForm onSubmit={handleSetSubmit} />}
    </div>
  )
}

export default WorkoutLogger