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
  let text = null;
  const className = "gem-holder";

  let xTextAdjust = 4;
  let textSize = 13;
  if (squareNumber >= 9) {
    xTextAdjust = 8;
    textSize = 13;
  }
  text = (
    <text fontFamily="Verdana" fontSize={textSize} fill="#FFFFFF">
      {squareNumber + 1}
    </text>
  );

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
      {/* {targetCircle} */}
      {text}
      {/* {tick} */}
    </svg>
  );
}
