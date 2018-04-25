import React from "react";
import Stone from "./Stone";
import Gem from "./Gem";
import { levelColor } from "./Levels";

const offsetX = 10;
const offsetY = 10;

export const sequanceArray = size => {
  return Array.from(Array(size).keys());
};

const createSquares = (number, target, showLevels) => {
  return sequanceArray(100).map(squareNumber => {
    let className = "";
    const selected = number === squareNumber + 1;
    const isTarget = target === squareNumber + 1;
    const completed = number === target;
    if (number > squareNumber) {
      className = "action";
    }

    if (number === target && squareNumber === target - 1) {
      className = className + " completed";
    }
    const size = 26;
    const margin = 2;
    const rowNumber = Math.floor(squareNumber / 10);
    const colNumber = Math.floor(squareNumber % 10);
    const x = size * colNumber + margin * colNumber + offsetX;
    const y = size * rowNumber + margin * rowNumber + offsetY;
    let text = null;

    // let targetCircle = null;
    // if (squareNumber === target - 1 && !showLevels) {
    //   targetCircle = (
    //     <circle
    //       // cx={size / 2}
    //       // cy={size / 2}
    //       r="17"
    //       fill="none"
    //       stroke="#c2c2e7"
    //       strokeWidth="2"
    //     />
    //   );
    // }

    // if (squareNumber === number - 1) {
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

    const squareValue = squareNumber + 1;
    const textX = squareValue < 10 ? 10 : squareValue === 100 ? 5 : 8;
    const textColor = selected ? "#FFFFFF" : isTarget ? "#FFFFFF" : "#999999";
    return (
      <svg key={squareNumber} x={x} y={y} width={size} height={size}>
        <Stone
          size={size}
          selected={selected}
          isTarget={isTarget}
          targetColor={"#FF0000"}
          showGem={completed && isTarget}
          gemColor={levelColor(squareValue)}
        />

        {/* {targetCircle} */}
        <text
          x={textX}
          y={15}
          fontFamily="Verdana"
          fontSize={8}
          fill={textColor}
          // fontWeight="bold"
        >
          {squareNumber + 1}
        </text>
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

//     <svg className="grid" width="300" height="300">
//       {rects}
//     </svg>
//   );
// }
