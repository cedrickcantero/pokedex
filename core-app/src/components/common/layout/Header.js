import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>PokéDex</h1>
      <nav>
        <ul>
          <li><Link to="/items">Items</Link></li>
          <li><Link to="/pokemons">Pokémons</Link></li>
          <li><Link to="/moves">Moves</Link></li>
          <li><Link to="/types">Types</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
