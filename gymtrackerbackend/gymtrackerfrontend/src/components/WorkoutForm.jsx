import React, { useState } from 'react'

const WorkoutForm = ({ onSubmit }) => {
    const [date, setDate] = useState('')
    const handleSubmission = (event) => {
        event.preventDefault()
        onSubmit({ date, exercises: [] })
    }
    return (
        <form onSubmit={handleSubmission}>
            <h2>Create Workout</h2>
            <label>
            Date:
            <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
            />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default WorkoutForm