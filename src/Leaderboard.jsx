import { Link } from 'react-router-dom'
import { useLeaderboard } from './LeaderboardContext'

function Leaderboard() {
  const { leaderboard } = useLeaderboard()

  return (
    <div>
      <h1>Leaderboard</h1>
      <Link to="/">Back to Game</Link>
      <ul className="list-disc">
        {leaderboard && leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
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
