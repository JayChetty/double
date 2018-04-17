import React from "react";
import "./Gem.css";

export default function Gem({ size, color }) {
  const hlfSize = size / 2;
  const gap = size / 5;

  const outerTop = `${hlfSize} 0`;
  const outerRight = `${size} ${hlfSize}`;
  const outerBottom = `${hlfSize} ${size}`;
  const outerLeft = `0 ${hlfSize}`;

  const innerTop = `${hlfSize} ${gap}`;
  const innerRight = `${size - gap} ${hlfSize}`;
  const innerBottom = `${hlfSize} ${size - gap}`;
  const innerLeft = `${gap} ${hlfSize}`;

  return (
    <g>
      <path
        d={`M ${outerTop} L ${innerTop} L ${innerLeft} L ${outerLeft} Z`}
        fill={color}
        stroke={color}
        opacity="0.2"
      />
      <path
        d={`M ${outerTop} L ${innerTop} L ${innerRight} L ${outerRight} Z`}
        fill={color}
        stroke={color}
        opacity="0.6"
      />
      <path
        d={`M ${outerBottom} L ${innerBottom} L ${innerRight} L ${outerRight} Z`}
        fill={color}
        stroke={color}
        opacity="0.8"
      />
      <path
        d={`M ${outerBottom} L ${innerBottom} L ${innerLeft} L ${outerLeft} Z`}
        fill={color}
        stroke={color}
        opacity="0.5"
      />
      <path
        d={`M ${innerTop} L ${innerRight} L ${innerBottom} L ${innerLeft} Z`}
        fill={color}
        stroke={color}
        opacity="0.25"
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
