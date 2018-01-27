import React from "react";

const offsetX = 10;
const offsetY = 10;

const sequanceArray = size => {
  return Array.from(Array(size).keys());
};

const createSquaresOverview = (completedLevels, createLevelClickAction) => {
  console.log("completedLevels", completedLevels);
  return sequanceArray(100).map(squareNumber => {
    let className = "";
    if (
      completedLevels.some(
        completedLevelindex => completedLevelindex === squareNumber
      )
    ) {
      className = className + " level-completed";
    }
    const size = 20;
    const margin = 8;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    const onClick = createLevelClickAction(squareNumber);
    return (
      <g key={squareNumber} onClick={onClick}>
        <rect
          className={className}
          x={x}
          y={y}
          width={size}
          height={size}
          fill="#EEEEEE"
          stroke="#EEEEEE"
          rx={1}
          ry={1}
        />
      </g>
    );
  });
};

const createSquaresGame = (number, target) => {
  return sequanceArray(100).map(squareNumber => {
    let className = "";
    if (number > squareNumber) {
      className = "action";
    }
    if (number === target && squareNumber === target - 1) {
      className = className + " completed";
    }
    const size = 20;
    const margin = 8;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    let text = null;

    let targetCircle = null;
    if (squareNumber === target - 1) {
      targetCircle = (
        <circle
          cx={x + size / 2}
          cy={y + size / 2}
          r="17"
          fill="none"
          stroke="#993456"
          strokeWidth="2"
        />
      );
    }

    if (squareNumber === number - 1) {
      let xTextAdjust = 5;
      let textSize = 15;
      if (number >= 10) {
        xTextAdjust = 8;
        textSize = 13;
      }
      text = (
        <text
          x={x + size / 2 - xTextAdjust}
          y={y + size / 2 + 5}
          fontFamily="Verdana"
          fontSize={textSize}
        >
          {number}
        </text>
      );
    }
    return (
      <g key={squareNumber}>
        <rect
          className={className}
          x={x}
          y={y}
          width={size}
          height={size}
          fill="#EEEEEE"
          stroke="#EEEEEE"
          rx={1}
          ry={1}
        />
        {targetCircle}
        {null}
      </g>
    );
  });
};

export default function Grid({
  number,
  target,
  showLevels,
  completedLevels,
  createLevelClickAction
}) {
  console.log("showlevels 2", showLevels);
  const rects = showLevels
    ? createSquaresOverview(completedLevels, createLevelClickAction)
    : createSquaresGame(number, target);
  return (
    <svg className="grid" width="300" height="300">
      {rects}
    </svg>
  );
}
