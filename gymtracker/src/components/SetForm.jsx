import React, { useState } from 'react'

const SetForm = ({ onSubmit }) => {
  const [sets, setSets] = useState([])
  const [setDetails, setSetDetails] = useState({ reps: '', weight: '' })

  const handleAddSet = (event) => {
    event.preventDefault()
    setSets([...sets, setDetails]);
    setSetDetails({ reps: '', weight: '' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(sets)
  }

  return (
    <div>
        <h4>Add Sets</h4>
        <form onSubmit={handleAddSet}>
        <label>
          Reps:
          <input
            type="number"
            value={setDetails.reps}
            onChange={(event) => setSetDetails({ ...setDetails, reps: event.target.value })}
            required
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            value={setDetails.weight}
            onChange={(event) => setSetDetails({ ...setDetails, weight: event.target.value })}
            required
          />
        </label>
        <button type="submit">Add Set</button>
        </form>
        <ul>
        {sets.map((set, index) => (
          <li key={index}>
            Reps: {set.reps}, Weight: {set.weight}
          </li>
        ))}
        </ul>
        <button onClick={handleSubmit}>Finish Exercise</button>
    </div>
    )
}

export default SetForm
