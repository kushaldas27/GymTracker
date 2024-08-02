import { useState, useEffect } from 'react'
import axios from 'axios'
import WorkoutLogger from './components/WorkoutLogger'

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Workout Logger</h1>
      </header>
      <main>
        <WorkoutLogger />
      </main>
    </div>
  )
}

export default App
