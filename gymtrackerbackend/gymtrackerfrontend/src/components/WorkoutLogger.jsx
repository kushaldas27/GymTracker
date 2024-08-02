import React, { useState, useEffect } from 'react'
import WorkoutForm from './WorkoutForm'
import ExerciseForm from './ExerciseForm'
import SetForm from './SetForm'
import workoutService from './services/workoutService'


const WorkoutLogger = () => {
  const [workout, setWorkout] = useState(null)
  const [currentExercise, setCurrentExercise] = useState(null)
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    workoutService.getAll().then(initialWorkouts => {
      setWorkouts(initialWorkouts)
    })
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleWorkoutSubmit = (data) => {
    workoutService.create(data).then(returnedWorkout => {
      setWorkouts(workouts.concat(returnedWorkout))
      setWorkout(returnedWorkout)
    })
  }

  const handleExerciseSubmit = (data) => {
    setCurrentExercise(data)
  }

  const handleSetSubmit = (sets) => {
    const updatedExercise = { ...currentExercise, sets }
    const updatedWorkout = {...workout,
      exercises: [...workout.exercises, updatedExercise],
    }
    workoutService.update(workout.id, updatedWorkout).then(returnedWorkout => {
      setWorkouts(workouts.map(w => (w.id !== workout.id ? w : returnedWorkout)))
      setWorkout(returnedWorkout)
      setCurrentExercise(null)
    })
  }

  const handleSubmitWorkout = () => {
    workoutService.update(workout.id, workout).then(returnedWorkout => {
      setWorkouts(workouts.map(w => (w.id !== workout.id ? w : returnedWorkout)))
      console.log('Workout saved:', returnedWorkout)
    }).catch(error => {
      console.error('Error saving workout:', error)
    })
  }
  // Add this line before the return statement
  console.log('Workout:', workout);

  return (
    <div>
      {!workout && <WorkoutForm onSubmit={handleWorkoutSubmit} />}
      {workout && !currentExercise && (
        <div>
          <h2>Workout Date: {formatDate(workout.date)}</h2>
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