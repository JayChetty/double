import React, { Component } from "react";
import "./App.css";

const offsetX = 10;
const offsetY = 10;

const levels = [
  { target: 2, allowedMoves: 1 },
  { target: 3, allowedMoves: 2 },
  { target: 4, allowedMoves: 3 },
  { target: 4, allowedMoves: 2 },
  { target: 8, allowedMoves: 4 },
  { target: 8, allowedMoves: 3 },
  { target: 6, allowedMoves: 4 },
  { target: 6, allowedMoves: 3 },
  { target: 5, allowedMoves: 3 },
  { target: 7, allowedMoves: 4 },
  { target: 9, allowedMoves: 4 },
  { target: 10, allowedMoves: 5 },
  { target: 10, allowedMoves: 4 }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 1, moves: 0, levelIndex: 0, stalled: false };
    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.double = this.double.bind(this);
  }
  sequanceArray(size) {
    return Array.from(Array(size).keys());
  }
  level() {
    return levels[this.state.levelIndex];
  }

  createSquares(number, target) {
    return this.sequanceArray(100).map(squareNumber => {
      let className = "";
      if (number > squareNumber) {
        className = "action";
      }
      if (number === target && squareNumber === target - 1) {
        className = className + " completed";
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
            strokeWidth="2"
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
          >
            {number}
          </text>
        );
      }
      return (
        <g key={squareNumber}>
          <rect
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
          {null}
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

  stallAndComplete(levelIncrease, wait) {
    this.setState({ stalled: true }, () => {
      setTimeout(() => {
        this.setState({
          levelIndex: this.state.levelIndex + levelIncrease,
          number: 1,
          moves: 0,
          stalled: false
        });
      }, wait);
    });
  }

  completed() {
    this.stallAndComplete(1, 2000);
  }

  reset() {
    this.stallAndComplete(0, 1000);
  }

  render() {
    const { stalled, moves, number } = this.state;
    const { target, allowedMoves } = this.level();
    const rects = this.createSquares(number, target);
    if (number === target && !this.state.stalled) {
      this.completed();
    } else if (moves >= allowedMoves && !stalled) {
      this.reset();
    }
    return (
      <div className="App">
        <svg className="grid" width="300" height="300">
          {rects}
        </svg>
        <span>
          {target} in {allowedMoves}
        </span>
        <div className="buttons">
          <button
            disabled={stalled}
            className="button"
            onClick={this.removeOne}
          >
            -1
          </button>
          <button disabled={stalled} className="button" onClick={this.double}>
            x2
          </button>
          <button disabled={stalled} className="button" onClick={this.addOne}>
            +1
          </button>
        </div>
      </div>
    );
  }
}

export default App;
