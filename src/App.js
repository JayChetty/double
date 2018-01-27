import React, { Component } from "react";
import "./App.css";
import Levels from "./components/Levels";

import Grid from "./components/Grid";
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
    this.state = {
      number: 1,
      moves: 0,
      levelIndex: 0,
      stalled: false,
      showLevels: false
    };
    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.double = this.double.bind(this);
    this.playNextLevel = this.playNextLevel.bind(this);
  }

  level() {
    return levels[this.state.levelIndex];
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

  playNextLevel() {
    this.setState({ levelIndex: this.state.levelIndex + 1, showLevels: false });
  }

  completed() {
    this.setState({ stalled: true }, () => {
      setTimeout(() => {
        this.setState({
          number: 1,
          moves: 0,
          stalled: false,
          showLevels: true
        });
      }, 2000);
    });
  }

  reset() {
    this.setState({ stalled: true }, () => {
      setTimeout(() => {
        this.setState({
          number: 1,
          moves: 0,
          stalled: false
        });
      }, 1000);
    });
  }

  render() {
    const { stalled, moves, number, levelIndex, showLevels } = this.state;
    const { target, allowedMoves } = this.level();
    console.log("number", number);
    console.log("target", target);
    console.log("stalled", stalled);

    const levelComplete = number === target && !stalled;

    if (levelComplete) {
      this.completed();
    } else if (moves >= allowedMoves && !stalled) {
      this.reset();
    }
    return (
      <div className="App">
        <Levels
          levels={levels}
          currentLevelIndex={levelIndex}
          show={showLevels}
          playNextLevel={this.playNextLevel}
        />
        <Grid number={number} target={target} />

        {/* <span>
          {target} in {allowedMoves}
        </span> */}
        <div className="buttons">
          <button
            disabled={stalled}
            className="button"
            onClick={this.removeOne}
          >
            -
          </button>
          <button
            disabled={stalled}
            className="button large"
            onClick={this.double}
          >
            x2
          </button>
          <button disabled={stalled} className="button" onClick={this.addOne}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default App;
