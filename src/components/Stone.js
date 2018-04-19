import React from "react";
import "./Stone.css";
import { pure } from "recompose";

function randomLine(start, end, numStops, range) {
  const xDiff = end.x - start.x;
  const yDiff = end.y - start.y;

  const xChunk = xDiff / (numStops + 1);
  const yChunk = yDiff / (numStops + 1);

  const stops = Array(numStops)
    .fill(undefined)
    .map((_, index) => {
      const xNoise = (Math.random() - 0.5) * range;
      const yNoise = (Math.random() - 0.5) * range;

      return {
        x: start.x + xChunk * (index + 1) + xNoise,
        y: start.y + yChunk * (index + 1) + yNoise
      };
    });
  return [start, ...stops, end];
}

function lineAsD(path) {
  const stringList = path.map((coords, index) => {
    return cToS(coords, index === 0);
  });
  return stringList.join(" ") + " Z";
}

function cToS({ x, y }, start = false) {
  const letter = start ? "M" : "L";
  return `${letter} ${x} ${y}`;
}

function Stone({ size, selected, isTarget, completed }) {
  const halfSize = size / 2;
  const gap = size / 5;

  const top = { x: halfSize, y: 0 };
  const right = { x: size, y: halfSize };
  const bottom = { x: halfSize, y: size };
  const left = { x: 0, y: halfSize };

  const innerTop = { x: halfSize, y: gap };
  const innerRight = { x: size - gap, y: halfSize };
  const innerBottom = { x: halfSize, y: size - gap };
  const innerLeft = { x: gap, y: halfSize };

  const noiseRange = 2;

  const topToRight = randomLine(top, right, 2, noiseRange);
  const rightToBottom = randomLine(right, bottom, 2, noiseRange);
  const bottomToLeft = randomLine(bottom, left, 2, noiseRange);
  const leftToTop = randomLine(left, top, 2, noiseRange);

  const pathCoords = [
    ...topToRight,
    ...rightToBottom,
    ...bottomToLeft,
    ...leftToTop
  ];

  const d = lineAsD(pathCoords);

  const color = "#43464B";

  const opacity = Math.max(Math.random() / 3, 0.2);

  const strokeColor = "black";
  const strokeWidth = 1;

  const gemNWd = lineAsD([left, top, innerTop, innerLeft]);
  console.log({ gemNWd });
  const gemColor = "#0F52BA";

  const gemPieceNW = (
    <path
      d={lineAsD([left, top, innerTop, innerLeft])}
      fill={gemColor}
      stroke={gemColor}
      opacity={0.2}
    />
  );

  const gemPieceNE = (
    <path
      d={lineAsD([right, top, innerTop, innerRight])}
      fill={gemColor}
      stroke={gemColor}
      opacity={0.6}
    />
  );

  const gemPieceSE = (
    <path
      d={lineAsD([right, bottom, innerBottom, innerRight])}
      fill={gemColor}
      stroke={gemColor}
      opacity={0.8}
    />
  );

  const gemPieceSW = (
    <path
      d={lineAsD([left, bottom, innerBottom, innerLeft])}
      fill={gemColor}
      stroke={gemColor}
      opacity={0.5}
    />
  );

  const gemPieceHeart = (
    <path
      d={lineAsD([innerTop, innerRight, innerBottom, innerLeft])}
      fill={gemColor}
      stroke={gemColor}
      opacity={0.25}
    />
  );

  const rock = (
    <path
      d={d}
      fill={color}
      stroke={strokeColor}
      fill-opacity={opacity}
      strokeWidth={strokeWidth}
    />
  );

  const gem = [gemPieceNW, gemPieceNE, gemPieceSE, gemPieceSW, gemPieceHeart];
  const piece = completed && isTarget ? gem : rock;
  return <g className={selected ? "stone rotate" : "stone"}>{piece}</g>;
}

// function gemPiece({ d, gemColor }) {
//   return;
//   <path
//     d={d}
//     fill={gemColor}
//     stroke={strokeColor}
//     fill-opacity={opacity}
//     strokeWidth={strokeWidth}
//   />;
// }

export default pure(Stone);
