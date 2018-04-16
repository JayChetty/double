import React from "react";
import Gem from "./Gem";
import "./Levels.css";
import bestScores from "../data/levels";

const offsetX = 10;
const offsetY = 10;

export const sequanceArray = size => {
  return Array.from(Array(size).keys());
};

const levels = [3, 5, 6];

const colorForLevel = level => {};

const createSquares = (target, completedLevels, clicked) => {
  return sequanceArray(100).map(squareNumber => {
    const size = 20;
    const margin = 8;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    const completed = completedLevels.some(
      completed => completed - 1 === squareNumber
    );

    const levelOfSquare = squareNumber + 1;
    let color = "#0F52BA";
    console.log("color", bestScores[levelOfSquare]);
    if (bestScores[levelOfSquare] > 8) {
      color = "#E0115F";
    } else if (bestScores[levelOfSquare] > 6) {
      color = "#b9f2ff";
    } else if (bestScores[levelOfSquare] > 4) {
      color = "#50c878";
    }

    return (
      <Gem
        squareNumber={squareNumber}
        x={x}
        y={y}
        size={size}
        clicked={clicked}
        target={target}
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
