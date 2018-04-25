import React from "react";

export default function GemHolder({ size, strokeColor, fillColor }) {
  const hlfSize = size / 2;
  return (
    <path
      d={`M ${hlfSize} 0 L ${size} ${hlfSize} L ${hlfSize} ${size} L 0 ${hlfSize} Z`}
      fill={fillColor}
      stroke={strokeColor}
      fill-opacity="0.6"
    />
  );
}
