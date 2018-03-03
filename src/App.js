import React, { Component } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Feedback from "./components/Feedback";
import NextLevelButton from "./components/NextLevelButton";
import LevelView from "./components/LevelView";
import bestScores from "./data/levels";
import { sequanceArray } from "./components/Grid";
import icons from "./components/icons";
const levels = [4, 6, 8, 5, 10, 12, 7, 14, 15, 9, 16, 11, 18, 19, 13, 20];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      moves: 0,
      levelIndex: 0,
      stalled: false,
      showLevels: false,
      completedLevels: 0,
      moveList: []
    };
    this.playMove = this.playMove.bind(this);
    this.createLevelClickAction = this.createLevelClickAction.bind(this);
    this.go = this.go.bind(this);
  }

  delay(time) {
    return new Promise((yah, _) => {
      setTimeout(yah, time);
    });
  }

  doneMoves() {
    const { target, best } = this.level();
    const { moves, number } = this.state;
    const atTarget = number === target;
    // const inMinMoves = best === moves;
    console.log("best moves", best, moves);
    this.setState({ stalled: true }, async () => {
      await this.delay(2000);
      if (atTarget) {
        this.setState({
          number: 1,
          moves: 0,
          stalled: false,
          showLevels: true,
          completedLevels: this.state.completedLevels + 1,
          moveList: []
        });
      } else {
        this.setState({
          number: 1,
          moves: 0,
          stalled: false,
          moveList: []
        });
      }
    });
  }

  level() {
    const target = levels[this.state.levelIndex];
    console.log("leve", { target, best: bestScores[target] });
    return { target, best: bestScores[target].best };
  }

  doMove(operation) {
    const { best } = this.level();
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

          const doneMoves = this.state.moves === best;
          doneMoves && this.doneMoves();
        }
      );
    };
  }

  playMove(operation) {
    return _ => {
      const { best } = this.level();
      if (this.state.moveList.length === best) {
        return;
      }
      this.setState({
        moveList: [...this.state.moveList, operation]
      });
    };
  }

  createLevelClickAction(index) {
    return levelIndex =>
      this.setState({ levelIndex: index, showLevels: false });
  }

  async go() {
    const { moveList, moves } = this.state;
    if (moves > 0) {
      return;
    }
    for (var i = 0; i < moveList.length; i++) {
      this.doMove(moveList[i])();
      await this.delay(1500);
    }
    // moveList.forEach(async move => {
    //   await this.delay(2000);
    //   console.log("await", move);
    //   this.doMove(move)();
    // });
  }

  render() {
    const {
      stalled,
      number,
      showLevels,
      completedLevels,
      moves,
      levelIndex,
      moveList
    } = this.state;
    const { target, best } = this.level();

    const controls = showLevels ? null : (
      <Controls
        stalled={stalled}
        number={number}
        playMove={this.playMove}
        best={best}
        moveList={moveList}
        moves={moves}
        go={this.go}
      />
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

    // const moveItems = moveList.map((move, index) => {
    //   const isActive = index == moves - 1;
    //   const classes = isActive ? "active-move" : null;
    //   return (
    //     <div className={classes} key={index}>
    //       {move}
    //     </div>
    //   );
    // });

    // const moveEl = <div>{moveItems}</div>;
    //
    // const controlButton =
    //   best === moveList.length ? (
    //     <button onClick={this.go}> go </button>
    //   ) : (
    //     controls
    //   );
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
