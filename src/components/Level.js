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
  color,
  active
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
        // x={x + size / 2 - xTextAdjust}
        // y={y + size / 2 + 3}
        fontFamily="Verdana"
        fontSize={textSize}
        fill="#FFFFFF"
      >
        {squareNumber + 1}
      </text>
    );
  }

  const hlfSize = size / 2;
  const displayColor = active ? color : "#CCCCCC";
  const click = active ? clicked(squareNumber + 1) : null;
  const levelIcon = completed ? (
    <Gem numPieces={5} color={color} size={size} />
  ) : (
    <g>
      <path
        d={`M ${hlfSize} 0 L ${size} ${hlfSize} L ${hlfSize} ${size} L 0 ${hlfSize} Z`}
        fill={selected ? color : "#FFFFFF"}
        stroke={displayColor}
        fill-opacity="0.6"
      />
    </g>
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
