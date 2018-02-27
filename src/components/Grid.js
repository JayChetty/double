import React from "react";

const offsetX = 10;
const offsetY = 10;

const sequanceArray = size => {
  return Array.from(Array(size).keys());
};

const createSquares = (number, target, showLevels) => {
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
    if (squareNumber === target - 1 && !showLevels) {
      targetCircle = (
        <circle
          cx={x + size / 2}
          cy={y + size / 2}
          r="17"
          fill="none"
          stroke="#449281"
          strokeWidth="2"
          opacity={0.5}
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
          transform-origin={`${x + size / 2}px ${y + size / 2}px`}
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

export default function Grid({ number, target, showLevels }) {
  const rects = createSquares(number, target, showLevels);
  return (
    <svg className="grid" width="300" height="300">
      {rects}
    </svg>
  );
}
