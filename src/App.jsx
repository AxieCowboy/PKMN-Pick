import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function Home({ addToLeaderboard }) {
  const [pokemon, setPokemon] = useState(null);

  const fetchRandomPokemon = async () => {
    const randomID = Math.floor(Math.random() * 151) + 1;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
      if (!response.ok) throw new Error('PKMN not found!');
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      setPokemon(null);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const handleScore = (change) => {
    if (pokemon) {
      addToLeaderboard(pokemon.name, change);
      fetchRandomPokemon();
    }
  };

  return (
    <div>
      <h1>PKMN PICK</h1>
      <Link to="/leaderboard">View Leaderboard</Link>
      {pokemon ? (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          {pokemon.sprites?.front_default && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )}
          {pokemon.types && <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>}
          <div>
            <button onClick={() => handleScore(1)}>+</button>
            <button onClick={() => handleScore(-1)}>-</button>
          </div>
        </div>
      ) : (
        <p>PKMN not found!</p>
      )}
    </div>
  );
}

function Leaderboard({ leaderboard }) {
  return (
    <div>
      <h1>Leaderboard</h1>
      <Link to="/">Back to Game</Link>
      <ul className="list-disc">
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <li key={index} className="text-lg">{entry.name}: {entry.score}</li>
          ))
        ) : (
          <p>No scores yet!</p>
        )}
      </ul>
    </div>
  );
}

function App() {
  const [leaderboard, setLeaderboard] = useState([]);

  const addToLeaderboard = (name, score) => {
    setLeaderboard((prev) => {
      const existing = prev.find((entry) => entry.name === name);
      if (existing) {
        return prev.map((entry) =>
          entry.name === name ? { ...entry, score: entry.score + score } : entry
        );
      } else {
        return [...prev, { name, score }];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home addToLeaderboard={addToLeaderboard} />} />
        <Route path="/leaderboard" element={<Leaderboard leaderboard={leaderboard} />} />
      </Routes>
    </Router>
  );
}

export default App;
