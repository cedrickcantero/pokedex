import React from 'react';
import pokedex from '../../../../assets/images/Pokedex.png'

const Home = ({}) => {
  return (
    <div className="home-container">
      <h1>Welcome to Cedie's Pokedex!</h1>
      <p>This Pokedex provides information about various Pokemon: their types, abilities, and more.</p>
      <p>Feel free to search for your favorite Pokemon and learn something new!</p>
      <img src={pokedex} alt="Pokemon Image" className="pokemon-image" />
    </div>
  );
};

export default Home;
