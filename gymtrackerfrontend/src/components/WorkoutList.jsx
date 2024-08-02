import React, { useEffect, useState } from 'react'
import workoutService from './services/workoutService' 

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    workoutService.getAll().then(initialWorkouts => {
      setWorkouts(initialWorkouts);
    })
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      workoutService.deleteEntry(id).then(() => {
        setWorkouts(workouts.filter(workout => workout.id !== id));
      })
    }
  }

  return (
    <div>
      <h2>Past Workouts</h2>
      <ul>
        {workouts.map(workout => (
          <li key={workout._id}>
            <strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}
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
            <button onClick={() => handleDelete(workout._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutList