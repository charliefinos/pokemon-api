import React from 'react'
import './App.css';
import PokemonListItem from './components/PokemonListItem'
import { getPokemons } from './services/pokemons';

function App() {
  const [pokemons, setPokemons] = React.useState([])

  React.useEffect(() => {
    getPokemons().then(setPokemons);
  }, []);
  return (
    <section className="App">
      {pokemons.map((item) => (
        <PokemonListItem key={item.name} name={item.name} />
      ))}
    </section>
  );
}

export default App;
