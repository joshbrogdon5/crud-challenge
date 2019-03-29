import React, { Component } from 'react';
import logo from './logo.svg';
import './reset.css';
import Home from './components/Home/Home.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
