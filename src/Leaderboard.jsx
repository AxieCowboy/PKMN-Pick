import { Link } from 'react-router-dom'
import { useLeaderboard } from './LeaderboardContext'

function Leaderboard() {
  const { Leaderboard } = useLeaderboard()

  return (
    <div>
      <h1>Leaderboard</h1>
      <Link to="/">Back to Game</Link>
      <ul className="list-disc">
        {Leaderboard && Leaderboard.length > 0 ? (
          Leaderboard.map((entry, index) => (
            <li key={index}>{entry.name}: {entry.score}</li>
          ))
        ) : (
          <p>No scores yet!</p>
        )}
      </ul>
    </div>
  )
}

export default Leaderboard
