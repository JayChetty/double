import React from "react";

export default function Gem({
  x,
  y,
  size,
  completed,
  target,
  squareNumber,
  clicked,
  color
}) {
  let text = null;
  const className = "gem-holder";
  let targetCircle = null;

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

  return (
    <g key={squareNumber} onClick={clicked(squareNumber + 1)}>
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
