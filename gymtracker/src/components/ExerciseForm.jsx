import React, { useState } from 'react'

const ExerciseForm = ({ onSubmit }) => {
  const [exerciseName, setExerciseName] = useState('')
  const [sets, setSets] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ exerciseName, sets })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Exercise</h3>
      <label>
        Exercise Name:
        <input type="text" value={exerciseName} onChange={(event) => setExerciseName(event.target.value)}/>
      </label>
      <button type="submit">Add Sets</button>
    </form>
  )
}

export default ExerciseForm