import { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  // declaring props in class components
  // remove binding and use arrow functions on method for cleaner code
  // this.handlePClick = this.handlePClick.bind(this);

  // removing constructor and use public class states for cleaner code
  state = {
    name: 'Angela Caldas',
    counter: 0
  };

  handlePClick = () => {
    this.setState({ name: 'Dev Júnior' });
  };

  // we can use a method without 'bind' with arrow functions. Arrow functions don't have 'this'. So if we use 'this', the function will look for it in other parts of the component
  handleAClick = (event) => {
    event.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };

  render() {
    // using states with class components
    const { name, counter } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            {name} {counter}
          </p>
          <a
            onClick={this.handleAClick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Este é o Link
          </a>
        </header>
      </div>
    );
  }
}

export default App;
