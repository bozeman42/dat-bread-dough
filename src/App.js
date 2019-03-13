import React, { Component } from 'react';
import './App.css';
import { Calculator } from './components/Calculator'
class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='dbd-header'>
          <h1>Dat Bread, Dough!</h1>
        </header>
        <div className='Description'>
        <p>
          This calculator is used to find the appropriate water temperature for
          your dough based upon the calculation provided in
          Bonnie Ohara's <em>Bread Baking for Beginners</em>.
        </p>
        </div>
        <div>
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
