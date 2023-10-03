import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/common/layout/Main';
import Moves from './components/moves/Moves';
import Types from './components/types/Types';
import Pokemons from './components/pokemons/Pokemons';
import Items from './components/items/Items';
import Home from './components/common/layout/home/Home';

const RouterManager = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/pokemons" element={<Pokemons />} />
      <Route path="/moves" element={<Moves />} />
      <Route path="/types" element={<Types />} />
    </Routes>
  );
};

export default RouterManager;
