import React from "react";
import "./Gem.css";

export default function Gem({ x, y, size, color }) {
  console.log({ x, y, size });
  const cX = x + size / 2;
  const cY = y + size / 2;

  return (
    <g>
      <path
        d={`M ${x} ${y} L ${cX} ${cY}`}
        stroke={color}
        stroke-width="1"
        fill="none"
      />
      {/* <rect
        className="gem gem-inner"
        x={x + size / 4}
        y={y + size / 4}
        transform-origin={`${x + size / 2}px ${y + size / 2}px`}
        width={size / 2}
        height={size / 2}
        fill={color}
        stroke={color}
        rx={1}
        ry={1}
      />
      <rect
        className="gem gem-outer"
        x={x}
        y={y}
        transform-origin={`${x + size / 2}px ${y + size / 2}px`}
        width={size - 2}
        height={size - 2}
        fill={color}
        stroke={color}
        rx={1}
        ry={1}
      /> */}
    </g>
  );
}
