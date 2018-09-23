import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="login-page">
        <div class="form"> 
          <h1>Login </h1>
          <form class="login-form">
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Login</button>
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
