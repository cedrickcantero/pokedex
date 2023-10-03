import React, {useState} from 'react';
import './assets/styles/App.scss'
import RouterManager from './RouterManager';
import Main from './components/common/layout/Main';

function App() {
  return (
    <div className="App">
      <Main>
        <RouterManager/>
      </Main>
    </div>
  );
}

export default App;
