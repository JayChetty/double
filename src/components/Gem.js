import React from "react";
import "./Gem.css";

export default function Gem({ x, y, size, color }) {
  return (
    <rect
      className="gem"
      x={x}
      y={y}
      transform-origin={`${x + size / 2}px ${y + size / 2}px`}
      width={size - 2}
      height={size - 2}
      fill={color}
      stroke={color}
      rx={1}
      ry={1}
    />
  );
}
