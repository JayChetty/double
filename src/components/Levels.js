import React from "react";
import Level from "./Level";
import "./Levels.css";
import bestScores from "../data/levels";

const offsetX = 10;
const offsetY = 10;

const levels = [
  { minMoves: 0, maxMoves: 4, color: "#0F52BA" },
  { minMoves: 5, maxMoves: 6, color: "#E0115F" },
  { minMoves: 7, maxMoves: 8, color: "#b9f2ff" },
  { minMoves: 9, maxMoves: 10, color: "#50c878" }
];

export const levelDetails = completedLevels => {
  console.log({ completedLevels });
  const allTargets = sequanceArray(100).map(num => num + 1);
  return levels.map(level => {
    const targets = allTargets.filter(target => {
      const moves = bestScores[target];
      return moves >= level.minMoves && moves <= level.maxMoves;
    });
    const completedTargets = targets.filter(num =>
      completedLevels.includes(num)
    );
    return {
      targets,
      completedTargets,
      completed: targets.length === completedTargets.length
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

const createSquares = (target, completedLevels, clicked) => {
  const deets = levelDetails(completedLevels);
  console.log({ deets });

  return sequanceArray(100).map(squareNumber => {
    const size = 22;
    const margin = 6;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    const completed = completedLevels.some(
      completed => completed - 1 === squareNumber
    );

    const levelOfSquare = squareNumber + 1;
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
      />
    );
  });
};

export default function Levels({ target, completedLevels, updateTarget }) {
  const clicked = newTarget => () => updateTarget(newTarget);

  const rects = createSquares(target, completedLevels, clicked);
  return (
    <svg className="grid" width="300" height="300">
      {rects}
    </svg>
  );
}
