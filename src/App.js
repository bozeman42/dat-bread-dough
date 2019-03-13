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
        <div>
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
