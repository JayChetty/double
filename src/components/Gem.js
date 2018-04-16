import React from "react";
import bestScores from "../data/levels";

export default function Gem({
  x,
  y,
  size,
  completed,
  target,
  squareNumber,
  clicked
}) {
  let text = null;
  const className = "gem-holder";
  let targetCircle = null;
  let tick = null;

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

  if (squareNumber === target - 1) {
    let xTextAdjust = 3;
    let textSize = 11;
    if (squareNumber >= 9) {
      xTextAdjust = 8;
      textSize = 11;
    }
    text = (
      <text
        x={x + size / 2 - xTextAdjust}
        y={y + size / 2 + 5}
        fontFamily="Verdana"
        fontSize={textSize}
        fill="#858585"
      >
        {squareNumber + 1}
      </text>
    );
  }

  const levelOfSquare = squareNumber + 1;
  let color = "#EEEEEE";
  console.log("color", bestScores[levelOfSquare]);
  if (bestScores[levelOfSquare] > 7) {
    color = "#FF0000";
  } else if (bestScores[levelOfSquare] > 5) {
    color = "#00FF00";
  } else if (bestScores[levelOfSquare] > 3) {
    color = "#0000FF";
  }

  return (
    <g key={squareNumber} onClick={clicked(levelOfSquare)}>
      <rect
        className={className}
        x={x}
        y={y}
        transform-origin={`${x + size / 2}px ${y + size / 2}px`}
        width={size - 2}
        height={size - 2}
        fill={completed ? color : "#FFFFFF"}
        stroke={color}
        rx={1}
        ry={1}
      />
      {targetCircle}
      {text}
      {/* {tick} */}
    </g>
  );
}
