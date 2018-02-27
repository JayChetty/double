import React, { Component } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Feedback from "./components/Feedback";
import NextLevelButton from "./components/NextLevelButton";
import LevelView from "./components/LevelView";
import bestScores from "./data/levels";

const levels = [4, 6, 8, 5, 10, 12, 7, 14, 15, 9, 16, 11, 18, 19, 13, 20];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      moves: 0,
      levelIndex: 0,
      stalled: false,
      showLevels: false,
      completedLevels: 0
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
    const { best } = this.level();
    const { moves } = this.state;
    const inMinMoves = best === moves;
    console.log("best moves", best, moves);
    this.setState({ stalled: true }, async () => {
      await this.delay(2000);
      if (inMinMoves) {
        this.setState({
          number: 0,
          moves: 0,
          stalled: false,
          showLevels: true,
          completedLevels: this.state.completedLevels + 1
        });
      } else {
        this.setState({
          number: 0,
          moves: 0,
          stalled: false
        });
      }
    });
  }

  level() {
    const target = levels[this.state.levelIndex];
    console.log("leve", { target, best: bestScores[target] });
    return { target, best: bestScores[target].best };
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
          console.error("NOT RECOGNISED");
      }

      this.setState(
        {
          number: newNumber,
          moves: this.state.moves + 1
        },
        () => {
          const target = this.level().target;
          const atTarget = newNumber === target;

          atTarget && this.reachedTarget();
        }
      );
    };
  }

  createLevelClickAction(index) {
    return levelIndex =>
      this.setState({ levelIndex: index, showLevels: false });
  }

  render() {
    const {
      stalled,
      number,
      showLevels,
      completedLevels,
      moves,
      levelIndex
    } = this.state;
    const { target, best } = this.level();

    const controls = showLevels ? null : (
      <Controls stalled={stalled} number={number} playMove={this.playMove} />
    );
    const levelView = (
      <LevelView
        levels={levels}
        completedLevels={completedLevels}
        show={showLevels}
        goToNextLevel={this.createLevelClickAction(levelIndex + 1)}
      />
    );

    const grid = (
      <Grid
        number={number}
        target={target}
        showLevels={showLevels}
        completedLevels={completedLevels}
        createLevelClickAction={this.createLevelClickAction}
      />
    );

    return (
      <div className="App">
        {/* <Feedback moves={moves} atTarget={target === number} minMoves={best} /> */}
        {levelView}
        {grid}
        {controls}
      </div>
    );
  }
}

export default App;
