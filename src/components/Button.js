import React from "react";

export default function Button({ size, text }) {
  const hlfSize = size / 2;
  return (
    <path
      d={`M 0 0 L ${0} ${size} L ${size} ${size} L ${size} ${0} L ${0} ${0}  Z`}
      fill={"#555555"}
      stroke={"#555555"}
      fill-opacity="0.6"
    />
  );
}
