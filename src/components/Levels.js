import React from "react";

const offsetX = 10;
const offsetY = 10;

export const sequanceArray = size => {
  return Array.from(Array(size).keys());
};

const createSquares = (target, completedLevels) => {
  return sequanceArray(100).map(squareNumber => {
    let className = "";
    const size = 20;
    const margin = 8;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    let text = null;

    let targetCircle = null;
    let tick = null;
    const completed = completedLevels.some(
      completed => completed - 1 === squareNumber
    );
    if (completed) {
      tick = (
        <svg
          fill="#c2c2e7"
          width={size}
          height={size}
          x={x}
          y={y}
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" />
        </svg>
      );
    }
    if (squareNumber === target - 1) {
      targetCircle = (
        <circle
          cx={x + size / 2}
          cy={y + size / 2}
          r="17"
          fill="none"
          stroke="#c2c2e7"
          strokeWidth="2"
        />
      );
    }

    if (squareNumber === target - 1 || completed) {
      let xTextAdjust = 4;
      let textSize = 13;
      if (squareNumber >= 10) {
        xTextAdjust = 8;
        textSize = 13;
      }
      text = (
        <text
          x={x + size / 2 - xTextAdjust}
          y={y + size / 2 + 5}
          fontFamily="Verdana"
          fontSize={textSize}
          fill="#fff"
        >
          {squareNumber + 1}
        </text>
      );
    }
    // }
    return (
      <g key={squareNumber}>
        <rect
          className={className}
          x={x}
          y={y}
          transform-origin={`${x + size / 2}px ${y + size / 2}px`}
          width={size}
          height={size}
          fill="#EEEEEE"
          stroke="#EEEEEE"
          rx={1}
          ry={1}
        />
        {targetCircle}
        {text}
        {tick}
      </g>
    );
  });
};

export default function Levels({ target, completedLevels }) {
  const rects = createSquares(target, completedLevels);
  return (
    <svg className="grid" width="300" height="300">
      {rects}
    </svg>
  );
}
