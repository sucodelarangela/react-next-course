import { Component } from "react";

// class component just for learning purposes
export class Button extends Component {
  render() {
    const { text, clickAction } = this.props;
    return (
      <button onClick={clickAction}>{text}</button>
    );
  }
}