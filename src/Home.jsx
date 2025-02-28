import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLeaderboard } from './LeaderboardContext'
import './App.css'

function Home() {
  const [pokemon, setPokemon] = useState(null)
  const { dispatch } = useLeaderboard()

  const fetchRandomPokemon = async () => {
    const randomID = Math.floor(Math.random() * 151) + 1
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
      if (!response.ok) throw new Error('PKMN not found!')
      const data = await response.json()
      setPokemon(data)
    } catch (error) {
      setPokemon(null)
    }
  }

  useEffect(() => {
    fetchRandomPokemon()
  }, [])

  const handleScore = (change) => {
    if (pokemon) {
      dispatch({ type: 'ADD_SCORE', payload: { name: pokemon.name, score: change } })
      fetchRandomPokemon()
    }
  }

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
      </header>
      <main className="content">
        {pokemon ? (
          <div className="pokemon-container">
            <h2>{pokemon.name.toUpperCase()}</h2>
            {pokemon.sprites?.front_default && (
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-img" />
            )}
            <div className="button-container">
              <button onClick={() => handleScore(1)}>+</button>
              <button onClick={() => handleScore(-1)}>-</button>
            </div>
          </div>
        ) : (
          <p className="error-text">PKMN not found!</p>
        )}
      </main>
    </div>
  )
}

export default Home
