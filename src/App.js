import React, { Component } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Feedback from "./components/Feedback";
import NextLevelButton from "./components/NextLevelButton";
import levels from "./data/levels";

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
    const { best } = this.level();
    const { moves } = this.state;
    const inMinMoves = best === moves;
    console.log("best moves", best, moves);
    this.setState({ stalled: true }, async () => {
      await this.delay(2000);
      if (inMinMoves) {
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

    const controls = showLevels ? (
      <NextLevelButton
        goToNextLevel={this.createLevelClickAction(levelIndex + 1)}
      />
    ) : (
      <Controls stalled={stalled} number={number} playMove={this.playMove} />
    );
    return (
      <div className="App">
        <Feedback moves={moves} atTarget={target === number} minMoves={best} />
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
