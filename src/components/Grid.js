import React from "react";
import Stone from "./Stone";
import Gem from "./Gem";

const offsetX = 10;
const offsetY = 10;

export const sequanceArray = size => {
  return Array.from(Array(size).keys());
};

const createSquares = (number, target, showLevels) => {
  return sequanceArray(100).map(squareNumber => {
    let className = "";
    const selected = number === squareNumber + 1;
    const atTarget = target === squareNumber + 1;
    if (number > squareNumber) {
      className = "action";
    }

    if (number === target && squareNumber === target - 1) {
      className = className + " completed";
    }
    const size = 22;
    const margin = 6;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    let text = null;

    let targetCircle = null;
    if (squareNumber === target - 1 && !showLevels) {
      targetCircle = (
        <circle
          cx={x + size / 2}
          cy={y + size / 2}
          r="17"
          fill="none"
          stroke="#c2c2e7"
          strokeWidth="2"
        />
      );
    }

    if (squareNumber === number - 1) {
      let xTextAdjust = 4;
      let textSize = 13;
      if (squareNumber >= 9) {
        xTextAdjust = 8;
        textSize = 13;
      }
      text = (
        <text
          x={x + size / 2 - xTextAdjust}
          y={y + size / 2 + 5}
          fontFamily="Verdana"
          fontSize={textSize}
          fill="#FFFFFF"
        >
          {squareNumber + 1}
        </text>
      );
    }

    if (squareNumber === target - 1) {
      let xTextAdjust = 4;
      let textSize = 13;
      if (squareNumber >= 9) {
        xTextAdjust = 8;
        textSize = 13;
      }
      text = (
        <text
          x={x + size / 2 - xTextAdjust}
          y={y + size / 2 + 5}
          fontFamily="Verdana"
          fontSize={textSize}
          fill="#858585"
        >
          {squareNumber + 1}
        </text>
      );
    }

    return (
      <svg key={squareNumber} x={x} y={y} width={size} height={size}>
        <Stone
          size={size}
          selected={selected}
          target={atTarget}
          targetColor={"#FF0000"}
        />
        {/* <Gem size={size} color="#333333" /> */}
        {/* {targetCircle} */}
        {text}
      </svg>
    );
  });
};

export default function Grid({ number, target, showLevels }) {
  const rects = createSquares(number, target, showLevels);
  return (
    <svg className="grid" width="300" height="300">
      {rects}
    </svg>
  );
}
//     <svg className="grid" width="300" height="300">
//       {rects}
//     </svg>
//   );
// }
