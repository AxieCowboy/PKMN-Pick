import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { LeaderboardProvider } from './LeaderboardContext'
import Home from './Home.jsx'
import Leaderboard from './Leaderboard'

function App() {
  return (
    <LeaderboardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
        </Routes>
      </Router>
    </LeaderboardProvider>
  )
}

export default App
