import { useState, useEffect } from 'react';
import './App.css';

function App() {
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

  return (
    <div>
      <h1>PKMN PICK</h1>
      <button onClick={fetchRandomPokemon}>New PKMN</button>
      {pokemon ? (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          {pokemon.sprites?.front_default && (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )}
        </div>
      ) : (
        <p>PKMN not found!</p>
      )}
    </div>
  );
}

export default App;
