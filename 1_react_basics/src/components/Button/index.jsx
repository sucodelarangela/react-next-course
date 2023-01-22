import './styles.css';

import { Component } from "react";

// class component just for learning purposes
export class Button extends Component {
  render() {
    const { text, clickAction, disabled } = this.props;

    return (
      <button onClick={clickAction} className='button' disabled={disabled}>{text}</button>
    );
  }
}