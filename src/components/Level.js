import React from "react";
import Gem from "./Gem";
export default function Level({
  x,
  y,
  size,
  completed,
  selected,
  squareNumber,
  clicked,
  color
}) {
  let text = null;
  const className = "gem-holder";

  if (selected) {
    let xTextAdjust = 3;
    let textSize = 11;
    if (squareNumber >= 9) {
      xTextAdjust = 8;
      textSize = 11;
    }
    text = (
      <text
        x={x + size / 2 - xTextAdjust}
        y={y + size / 2 + 3}
        fontFamily="Verdana"
        fontSize={textSize}
        fill="#FFFFFF"
      >
        {squareNumber + 1}
      </text>
    );
  }

  const levelIcon = completed ? (
    <Gem x={x} y={y} color={color} size={size} />
  ) : (
    <rect
      className={className}
      x={x}
      y={y}
      transform-origin={`${x + size / 2}px ${y + size / 2}px`}
      width={size - 2}
      height={size - 2}
      fill={selected ? color : "#FFFFFF"}
      stroke={color}
      rx={1}
      ry={1}
    />
  );

  return (
    <g key={squareNumber} onClick={clicked(squareNumber + 1)}>
      {levelIcon}
      {/* {targetCircle} */}
      {text}
      {/* {tick} */}
    </g>
  );
}
