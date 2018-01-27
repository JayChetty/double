import React, { Component } from "react";
import "./App.css";
import Levels from "./components/Levels";

import Grid from "./components/Grid";
import Controls from "./components/Controls";

const levels = [
  { target: 1, best: 1 },
  { target: 2, best: 2 },
  { target: 3, best: 3 },
  { target: 4, best: 3 },
  { target: 5, best: 4 },
  { target: 6, best: 4 },
  { target: 7, best: 3 },
  { target: 8, best: 4 },
  { target: 9, best: 3 },
  { target: 10, best: 3 },
  { target: 11, best: 4 },
  { target: 12, best: 4 },
  { target: 13, best: 5 },
  { target: 14, best: 4 }
];

// const levels = [
//   { target: 2, allowedMoves: 1 },
//   { target: 3, allowedMoves: 2 },
//   { target: 4, allowedMoves: 3 },
//   { target: 4, allowedMoves: 2 },
//   { target: 8, allowedMoves: 4 },
//   { target: 8, allowedMoves: 3 },
//   { target: 6, allowedMoves: 4 },
//   { target: 6, allowedMoves: 3 },
//   { target: 5, allowedMoves: 3 },
//   { target: 7, allowedMoves: 4 },
//   { target: 9, allowedMoves: 4 },
//   { target: 10, allowedMoves: 5 },
//   { target: 10, allowedMoves: 4 }
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      moves: 0,
      levelIndex: 0,
      stalled: false,
      showLevels: false,
      completedLevels: []
    };
    this.addOne = this.addOne.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.double = this.double.bind(this);
    this.playNextLevel = this.playNextLevel.bind(this);
    this.createLevelClickAction = this.createLevelClickAction.bind(this);
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

  createLevelClickAction(index) {
    return levelIndex =>
      this.setState({ levelIndex: index, showLevels: false });
  }

  completed() {
    this.setState({ stalled: true }, () => {
      setTimeout(() => {
        const completedLevels = [
          ...this.state.completedLevels,
          this.state.levelIndex
        ];
        this.setState({
          number: 0,
          moves: 0,
          stalled: false,
          showLevels: true,
          completedLevels: completedLevels
        });
      }, 2000);
    });
  }

  reset() {
    this.setState({ stalled: true }, () => {
      setTimeout(() => {
        this.setState({
          number: 0,
          moves: 0,
          stalled: false
        });
      }, 1000);
    });
  }

  render() {
    const {
      stalled,
      moves,
      number,
      levelIndex,
      showLevels,
      completedLevels
    } = this.state;
    const { target, allowedMoves } = this.level();

    const levelComplete = number === target && !stalled;
    console.log("showlevels", showLevels);
    if (levelComplete) {
      this.completed();
    } else if (moves >= allowedMoves && !stalled) {
      this.reset();
    }
    const controls = showLevels ? null : (
      <Controls
        stalled={stalled}
        addOne={this.addOne}
        double={this.double}
        removeOne={this.removeOne}
      />
    );
    return (
      <div className="App">
        <Grid
          number={number}
          target={target}
          showLevels={showLevels}
          completedLevels={completedLevels}
          createLevelClickAction={this.createLevelClickAction}
        />
        {controls}
      </div>
    );
  }
}

export default App;
