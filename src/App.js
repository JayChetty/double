import React, { Component } from "react";
import "./App.css";

const offsetX = 10;
const offsetY = 10;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { target: 12, number: 1, moves: 0 };
    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.double = this.double.bind(this);
  }
  sequanceArray(size) {
    return Array.from(Array(size).keys());
  }

  createSquares(number, target) {
    return this.sequanceArray(100).map(squareNumber => {
      let className = null;
      if (number > squareNumber) {
        className = "action";
      }
      const size = 20;
      const margin = 8;
      const rowNumber = Math.floor(squareNumber / 10);
      const colNumber = Math.floor(squareNumber % 10);
      const x = size * colNumber + margin * colNumber + offsetX;
      const y = size * rowNumber + margin * rowNumber + offsetY;
      let text = null;

      let targetCircle = null;
      if (squareNumber === target - 1) {
        targetCircle = (
          <circle
            cx={x + size / 2}
            cy={y + size / 2}
            r="17"
            fill="none"
            stroke="#993456"
            stroke-width="2"
          />
        );
      }

      if (squareNumber === number - 1) {
        let xTextAdjust = 5;
        let textSize = 15;
        if (number >= 10) {
          xTextAdjust = 8;
          textSize = 13;
        }
        text = (
          <text
            x={x + size / 2 - xTextAdjust}
            y={y + size / 2 + 5}
            fontFamily="Verdana"
            fontSize={textSize}
            fill="#f4e6cb"
          >
            {number}
          </text>
        );
      }
      return (
        <g>
          <rect
            key={squareNumber}
            className={className}
            x={x}
            y={y}
            width={size}
            height={size}
            fill="#EEEEEE"
            stroke="#EEEEEE"
            rx={1}
            ry={1}
          />
          {targetCircle}
          {text}
        </g>
      );
    });
  }

  addOne() {
    this.setState({
      number: this.state.number + 1,
      moves: this.state.moves + 1
    });
  }

  removeOne() {
    if (this.state.number < 1) {
      return null;
    }
    this.setState({
      number: this.state.number - 1,
      moves: this.state.moves + 1
    });
  }
  double() {
    this.setState({
      number: this.state.number * 2,
      moves: this.state.moves + 1
    });
  }

  render() {
    const rects = this.createSquares(this.state.number, this.state.target);

    return (
      <div className="App">
        <svg className="grid" width="300" height="300">
          {rects}
        </svg>
        <span> Moves:{this.state.moves} </span>
        <div className="buttons">
          <button onClick={this.addOne}> +1 </button>
          <button onClick={this.double}> x2 </button>
          <button onClick={this.removeOne}> -1 </button>
        </div>
      </div>
    );
  }
}

export default App;
