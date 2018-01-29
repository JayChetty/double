import React, { Component } from "react";
import "./App.css";
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
    this.playMove = this.playMove.bind(this);
    this.createLevelClickAction = this.createLevelClickAction.bind(this);
  }

  delay(time) {
    return new Promise((yah, _) => {
      setTimeout(yah, time);
    });
  }

  reachedTarget() {
    this.setState({ stalled: true }, async () => {
      await this.delay(2000);
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

      // setTimeout(() => {
      //   const completedLevels = [
      //     ...this.state.completedLevels,
      //     this.state.levelIndex
      //   ];
      //   this.setState({
      //     number: 0,
      //     moves: 0,
      //     stalled: false,
      //     showLevels: true,
      //     completedLevels: completedLevels
      //   });
      // }, 2000);
    });
  }

  level() {
    return levels[this.state.levelIndex];
  }

  playMove(operation) {
    return a => {
      const currentNumber = this.state.number;
      let newNumber;
      switch (operation) {
        case "addOne":
          newNumber = currentNumber + 1;
          break;
        case "removeOne":
          newNumber = currentNumber - 1;
          break;
        case "double":
          newNumber = currentNumber * 2;
          break;
        default:
          console.error("NOT RECOGNISE");
      }

      this.setState({
        number: newNumber,
        moves: this.state.moves + 1
      });

      const target = this.level().target;
      const atTarget = newNumber === target;

      atTarget && this.reachedTarget();
    };
  }

  createLevelClickAction(index) {
    return levelIndex =>
      this.setState({ levelIndex: index, showLevels: false });
  }

  render() {
    const { stalled, number, showLevels, completedLevels } = this.state;
    const { target } = this.level();

    const controls = showLevels ? null : (
      <Controls stalled={stalled} playMove={this.playMove} />
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
