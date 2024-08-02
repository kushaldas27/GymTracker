import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import WorkoutLogger from './components/WorkoutLogger'
import WorkoutList from './components/WorkoutList'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Workout Logger</Link></li>
            <li><Link to="/workouts">Workout List</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/" element={<WorkoutLogger />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
