import React, { Fragment } from "react";
import Level from "./Level";
import Gem from "./Gem";
import GemHolder from "./GemHolder";

import "./Levels.css";
import bestScores from "../data/levels";

const offsetX = 10;
const offsetY = 10;

const gemColors = {
  emerald: "#40d67c",
  sapphire: "#0F52BA",
  ruby: "#E0115F",
  diamond: "#3ababc",
  gold: "#f9a602",
  purple: "#cc6ed8"
};
const levels = [
  { minMoves: 0, maxMoves: 4, color: gemColors.sapphire },
  { minMoves: 5, maxMoves: 5, color: gemColors.gold },
  { minMoves: 6, maxMoves: 6, color: gemColors.emerald },
  { minMoves: 7, maxMoves: 7, color: gemColors.ruby },
  { minMoves: 8, maxMoves: 8, color: gemColors.purple },
  { minMoves: 9, maxMoves: 10, color: gemColors.diamond }
];

export const levelDetails = completedLevels => {
  console.log({ completedLevels });
  const allTargets = sequanceArray(100).map(num => num + 1);
  const details = levels.map(level => {
    const targets = allTargets.filter(target => {
      const moves = bestScores[target];
      return moves >= level.minMoves && moves <= level.maxMoves;
    });
    const completedTargets = targets.filter(num =>
      completedLevels.includes(num)
    );
    return {
      color: level.color,
      targets,
      completedTargets,
      completed: targets.length === completedTargets.length
    };
  });
  return details.map((levelDetail, index) => {
    const active = index === 0 || details[index - 1].completed;
    return {
      ...levelDetail,
      active
    };
  });
};

export const sequanceArray = size => {
  return Array.from(Array(size).keys());
};

// export const level = levelNumber => {
//   const movesForNumber = bestScores[levelNumber]
//   if (bestScores[levelNumber] > 8) {
//     return 3;
//   } else if (bestScores[levelNumber] > 6) {
//     return 2;
//   } else if (bestScores[levelNumber] > 4) {
//     return 1;
//   }
//   return 0;
// };

export const levelColor = levelNumber => {
  const movesForNumber = bestScores[levelNumber];
  const level = levels.find(level => movesForNumber <= level.maxMoves);
  return level.color;
};

const createSquares = (target, completedLevels, clicked, levelInfo) => {
  console.log({ levelInfo });

  return sequanceArray(100).map(squareNumber => {
    const size = 22;
    const margin = 6;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    const completed = completedLevels.includes(squareNumber + 1);

    const levelOfSquare = squareNumber + 1;

    const levelGroup = levelInfo.find(info =>
      info.targets.includes(levelOfSquare)
    );

    // const levelGroup = level(levelOfSquare);
    const color = levelColor(levelOfSquare);
    return (
      <Level
        squareNumber={squareNumber}
        x={x}
        y={y}
        size={size}
        clicked={clicked}
        selected={target === levelOfSquare}
        color={color}
        completed={completed}
        active={levelGroup.active}
      />
    );
  });
};

export default function Levels({
  target,
  completedLevels,
  updateTarget,
  playLevel
}) {
  const clicked = newTarget => () => updateTarget(newTarget);
  const levelInfo = levelDetails(completedLevels);
  const levelIconSize = 30;

  const levelInfoEls = levelInfo.map((info, index) => {
    const icon = info.completed ? (
      <Gem numPieces={5} color={info.color} size={levelIconSize} />
    ) : (
      <GemHolder
        strokeColor={info.active ? info.color : "#CCCCCC"}
        fillColor={"#FFFFFF"}
        size={levelIconSize}
        text="?"
      />
    );
    return (
      <div className="level-row">
        <svg
          width="60%"
          // height="8vw"
          viewBox={`0 0 ${levelIconSize} ${levelIconSize}`}
        >
          {icon}
        </svg>
        {/* {info.completedTargets.length}/{info.targets.length} */}
      </div>
    );
  });

  const rects = createSquares(target, completedLevels, clicked, levelInfo);

  const selectedInfo = levelInfo.find(info => info.targets.includes(target));

  const playButtonSize = 50;
  const completed = completedLevels.includes(target);
  const playButton = completed ? (
    <Gem numPieces={5} color={selectedInfo.color} size={playButtonSize} />
  ) : (
    <GemHolder
      strokeColor={selectedInfo.active ? selectedInfo.color : "#CCCCCC"}
      fillColor={"#FFFFFF"}
      size={playButtonSize}
      text="?"
    />
  );

  return (
    // <section className="level-container">
    <Fragment>
      <svg className="grid" width="80%" viewBox="0 0 300 300">
        {rects}
      </svg>
      <div className="level-info">{levelInfoEls}</div>
      <div className="level-play-button">
        <svg
          width="15%"
          // height="10vw"
          viewBox={`0 0 ${playButtonSize} ${playButtonSize}`}
          className="play-button"
          onClick={playLevel}
        >
          {playButton}
          <text
            x={target > 10 ? 15 : 20}
            y={31}
            fontFamily="Verdana"
            fontSize={15}
            fill={selectedInfo.color}
          >
            {target}
          </text>
        </svg>
      </div>
    </Fragment>
  );
}
