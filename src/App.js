import React, { Component } from "react";
import "./App.css";

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
  // createRow(rowNumber) {
  //   return this.sequanceArray(10).map(colNumber => {
  //     const size = 20;
  //     const margin = 2;
  //     const x = size * colNumber + margin * colNumber;
  //     const y = size * rowNumber + margin * rowNumber;
  //     return (
  //       <rect
  //         className="test"
  //         x={x}
  //         y={y}
  //         width={size}
  //         height={size}
  //         rx="5"
  //         ry="5"
  //         fill="#121252"
  //       />
  //     );
  //   });
  // }

  createSquares(number, color, stroke = "#FFFFFF", strokeOpacity = "0.0") {
    // return this.sequanceArray(10).map(rowNumber => this.createRow(rowNumber));
    return this.sequanceArray(number).map(squareNumber => {
      const size = 20;
      const margin = 2;
      const rowNumber = Math.floor(squareNumber / 10);
      const colNumber = Math.floor(squareNumber % 10);
      const x = size * colNumber + margin * colNumber;
      const y = size * rowNumber + margin * rowNumber;
      return (
        <rect
          className="test"
          x={x}
          y={y}
          width={size}
          height={size}
          rx="5"
          ry="5"
          fill={color}
          stroke={stroke}
          strokeOpacity={strokeOpacity}
        />
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
    const baseRects = this.createSquares(100, "#EEEEEE");
    const targetRects = this.createSquares(
      this.state.target,
      "#EEEEEE",
      "#FF99DD",
      "1.0"
    );
    const rects = this.createSquares(this.state.number, "#121252");

    // const rects = this.createGrid();
    return (
      <div className="App">
        <svg className="grid" width="220" height="220">
          {baseRects}
          {targetRects}
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
