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
  const stringList = path.map(({ x, y }, index) => {
    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  });
  return stringList.join(" ");
}

function Stone({ size, selected, target }) {
  const noiseRange = 2;
  const halfSize = size / 2;

  const top = { x: halfSize, y: 0 };
  const right = { x: size, y: halfSize };
  const bottom = { x: halfSize, y: size };
  const left = { x: 0, y: halfSize };

  const topToRight = randomLine(top, right, 2, noiseRange);
  const rightToBottom = randomLine(right, bottom, 2, noiseRange);
  const bottomToLeft = randomLine(bottom, left, 2, noiseRange);

  const pathCoords = [...topToRight, ...rightToBottom, ...bottomToLeft];

  const d = lineAsD(pathCoords) + " Z";

  // const rightLine = randomLine(topRight, bottomRight, 2, noiseRange);
  // const bottomLine = randomLine(bottomRight, bottomLeft, 2, noiseRange);
  // const leftLine = randomLine(bottomLeft, topLeft, 2, noiseRange);
  //
  // const topLeft = { x: noiseRange, y: noiseRange };
  // const topRight = { x: size - noiseRange, y: noiseRange };
  //
  // const bottomRight = { x: size - noiseRange, y: size - noiseRange };
  // const bottomLeft = { x: noiseRange, y: size - noiseRange };
  //
  // const topLine = randomLine(topLeft, topRight, 2, noiseRange);
  // const rightLine = randomLine(topRight, bottomRight, 2, noiseRange);
  // const bottomLine = randomLine(bottomRight, bottomLeft, 2, noiseRange);
  // const leftLine = randomLine(bottomLeft, topLeft, 2, noiseRange);
  //
  // const pathCoords = [...topLine, ...rightLine, ...bottomLine, ...leftLine];
  //
  // const d = lineAsD(pathCoords);

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

  const opacity = Math.max(Math.random() / 2, 0.2);

  // const polishedStone = (
  //   <g>
  //     <path
  //       d={`M ${outerTopLeft} L ${outerTopRight} L ${innerTopRight} L ${innerTopLeft} Z`}
  //       fill={color}
  //       stroke={color}
  //       opacity="0.1"
  //     />
  //     <path
  //       d={`M ${outerTopRight} L ${outerBottomRight} L ${innerBottomRight} L ${innerTopRight} Z`}
  //       fill={color}
  //       stroke={color}
  //       opacity="0.4"
  //     />
  //     <path
  //       d={`M ${innerBottomRight} L ${outerBottomRight} L ${outerBottomLeft} L ${innerBottomLeft} Z`}
  //       fill={color}
  //       stroke={color}
  //       opacity="0.5"
  //     />
  //     <path
  //       d={`M ${outerTopLeft} L ${outerBottomLeft} L ${innerBottomLeft} L ${innerTopLeft} Z`}
  //       fill={color}
  //       stroke={color}
  //       opacity="0.6"
  //     />
  //     <path
  //       d={`M ${innerTopLeft} L ${innerTopRight} L ${innerBottomRight} L ${innerBottomLeft} Z`}
  //       fill={color}
  //       stroke={color}
  //       opacity="0.2"
  //     />
  //   </g>
  // );

  const strokeColor = target ? "#0F52BA" : "black";
  const strokeWidth = target ? 2 : 1;

  const rock = (
    <path
      className={selected ? "stone rotate" : "stone"}
      d={d}
      fill={color}
      stroke={strokeColor}
      fill-opacity={opacity}
      strokeWidth={strokeWidth}
    />
  );
  return rock;
}

export default pure(Stone);
