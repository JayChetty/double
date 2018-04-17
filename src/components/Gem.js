import React from "react";
import "./Gem.css";

export default function Gem({ x, y, size, color }) {
  const hlfSize = size / 2;
  return (
    <g>
      <path
        d={`M ${hlfSize} 0 L ${size} ${hlfSize} L ${hlfSize} ${size} L 0 ${hlfSize} Z`}
        fill={color}
        stroke={color}
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
