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
  createFilledSquares(number) {
    return this.sequanceArray(number).map(squareNumber => {
      const size = 20;
      const margin = 4;
      const rowNumber = Math.floor(squareNumber / 10);
      const colNumber = Math.floor(squareNumber % 10);
      const x = size * colNumber + margin * colNumber + offsetX;
      const y = size * rowNumber + margin * rowNumber + offsetY;

      return (
        <g>
          <rect
            key={squareNumber}
            className={"mover"}
            x={x}
            y={y}
            width={size}
            height={size}
            fill="#FFBB33"
            stroke="#000000"
            fillOpacity="0.8"
          />
          <polygon
            points={`${x},${y} ${x + 5},${y - 5} ${x + 5},${y + 15} ${x},${y +
              20}`}
            fill="#FFBB33"
            fillOpacity="0.8"
            stroke="#000000"
            className={"leftCube"}
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="scale"
              from="0.6 1"
              to="1 1"
              dur="1s"
            />
          </polygon>
          <polygon
            points={`${x},${y + 20} ${x + 20},${y + 20} ${x + 25},${y +
              15} ${x + 5},${y + 15}`}
            fill="#FFBB33"
            fillOpacity="0.8"
            stroke="#000000"
            className={"leftCube"}
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="scale"
              from="0.6 1"
              to="1 1"
              dur="1s"
            />
          </polygon>
        </g>
      );
    });
  }

  createSquares() {
    return this.sequanceArray(100).map(squareNumber => {
      const size = 20;
      const margin = 4;
      const rowNumber = Math.floor(squareNumber / 10);
      const colNumber = Math.floor(squareNumber % 10);
      const x = size * colNumber + margin * colNumber + offsetX;
      const y = size * rowNumber + margin * rowNumber + offsetY;

      return (
        <rect
          key={squareNumber}
          className={"standard"}
          x={x}
          y={y}
          width={size}
          height={size}
          fill="#EEEEEE"
          stroke="#EEEEEE"
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
    const baseRects = this.createSquares();
    const rects = this.createFilledSquares(this.state.number);

    // const rects = this.createGrid();
    return (
      <div className="App">
        <svg className="grid" width="260" height="260">
          {baseRects}
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
