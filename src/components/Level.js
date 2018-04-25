import React from "react";
import Gem from "./Gem";
import GemHolder from "./GemHolder";

export default function Level({
  x,
  y,
  size,
  completed,
  selected,
  squareNumber,
  clicked,
  color,
  active
}) {
  const className = "gem-holder";

  const textX = squareNumber + 1 < 10 ? 8 : squareNumber + 1 === 100 ? 3 : 6;
  const text = (
    <text x={textX} y={14} fontFamily="Verdana" fontSize={8} fill={color}>
      {squareNumber + 1}
    </text>
  );
  const displayText = active && !completed ? text : null;

  const displayColor = active ? color : "#CCCCCC";
  const click = active ? clicked(squareNumber + 1) : null;
  const levelIcon = completed ? (
    <Gem numPieces={5} color={color} size={size} />
  ) : (
    <GemHolder
      strokeColor={displayColor}
      fillColor={selected ? color : "#FFFFFF"}
      size={size}
    />
  );

  return (
    <svg
      key={squareNumber}
      onClick={click}
      x={x}
      y={y}
      width={size}
      height={size}
    >
      {levelIcon}
      {displayText}
    </svg>
  );
}
