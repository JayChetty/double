import React from "react";
// import "./Gem.css";

export default function Stone({ size }) {
  const color = "#43464B";
  const gap = size / 5;
  const outerTopLeft = `0 0`;
  const outerTopRight = `${size} 0`;
  const outerBottomRight = `${size} ${size}`;
  const outerBottomLeft = `0 ${size}`;

  const innerTopLeft = `${gap} ${gap}`;
  const innerTopRight = `${size - gap} ${gap}`;
  const innerBottomRight = `${size - gap} ${size - gap}`;
  const innerBottomLeft = `${gap} ${size - gap}`;

  return (
    <g>
      <path
        d={`M ${outerTopLeft} L ${outerTopRight} L ${innerTopRight} L ${innerTopLeft} Z`}
        fill={color}
        stroke={color}
        opacity="0.1"
      />
      <path
        d={`M ${outerTopRight} L ${outerBottomRight} L ${innerBottomRight} L ${innerTopRight} Z`}
        fill={color}
        stroke={color}
        opacity="0.4"
      />
      <path
        d={`M ${innerBottomRight} L ${outerBottomRight} L ${outerBottomLeft} L ${innerBottomLeft} Z`}
        fill={color}
        stroke={color}
        opacity="0.5"
      />
      <path
        d={`M ${outerTopLeft} L ${outerBottomLeft} L ${innerBottomLeft} L ${innerTopLeft} Z`}
        fill={color}
        stroke={color}
        opacity="0.6"
      />
      <path
        d={`M ${innerTopLeft} L ${innerTopRight} L ${innerBottomRight} L ${innerBottomLeft} Z`}
        fill={color}
        stroke={color}
        opacity="0.3"
      />
    </g>
  );
}
