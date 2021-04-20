import React, { useEffect, useState } from 'react'
import './App.css';
import PokemonListItem from './components/PokemonListItem'
import { getPokemons } from './services/pokemons';

function App() {
  const [pokemons, setPokemons] = useState([])

  const [errorState, setErrorState] = useState({ hasErrors: false })

  useEffect(() => {
    getPokemons().then(setPokemons).catch(handleError);
  }, []);

  function handleError(err) {
    setErrorState({ hasErrors: true, message: err.message })
  }
  return (
    <section className="App">
      {errorState.hasErrors && <div>{errorState.message}</div>}
      {pokemons.map((item) => (
        <PokemonListItem key={item.name} name={item.name} />
      ))}
    </section>
  );
}

export default App;
