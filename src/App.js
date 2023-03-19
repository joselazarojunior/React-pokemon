import React from 'react'
import './App.css';



const fetchPokemon = () => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemonPromises = [];

  for(let i=1; i <= 150; i++){
    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
     
  }

  Promise.all(pokemonPromises)
    .then(pokemons => {
      
      const lisPokemons = pokemons.reduce((accumulator, pokemon) => {

        const types = pokemon.types.map(typeInfo => typeInfo.type.name);

        accumulator += `
        <div class="card">
          <img class="card-img ${types[0]}" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" />
          <h2 class="card-title">${pokemon.id}.  ${pokemon.name}</h2>
          <p class="card-subtitle">${types.join('  |  ')}</p>
        </div>`
        return accumulator

      }, '')

      const div = document.querySelector('.poke-container');
      div.innerHTML = lisPokemons;
    }) 
}

fetchPokemon();

function App() {
  return (
    <div className='poke-container'>
      {/* <div className='container'>
        
      </div> */}

    </div>
    
  );
}



export default App;
