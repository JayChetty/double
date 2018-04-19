import React, { PureComponent } from "react";
import "./Stone.css";
import { pure } from "recompose";

export default class Stone extends PureComponent {
  state = { gemPieces: 0 };
  componentWillReceiveProps(nextProps) {
    // console.log("got props");
    if (nextProps.showGem) {
      this.showGem();
    }
  }

  showGem = async () => {
    await this.setGemPiece(1);
    await this.setGemPiece(2);
    await this.setGemPiece(3);
    await this.setGemPiece(4);
    await this.setGemPiece(5);
  };

  setGemPiece = pieces => {
    return new Promise((yah, nah) => {
      setTimeout(() => {
        this.setState({ gemPieces: pieces });
        yah();
      }, 300);
    });
  };

  render() {
    const { size, selected, isTarget } = this.props;
    const { gemPieces } = this.state;

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
    const gemColor = "#0F52BA";

    const gemPieceNW = (
      <path
        className="gem-piece"
        d={lineAsD([left, top, innerTop, innerLeft])}
        fill={gemColor}
        stroke={gemColor}
        opacity={0.2}
      />
    );

    const gemPieceNE = (
      <path
        className="gem-piece"
        d={lineAsD([right, top, innerTop, innerRight])}
        fill={gemColor}
        stroke={gemColor}
        opacity={0.4}
      />
    );

    const gemPieceSE = (
      <path
        className="gem-piece"
        d={lineAsD([right, bottom, innerBottom, innerRight])}
        fill={gemColor}
        stroke={gemColor}
        opacity={0.55}
      />
    );

    const gemPieceSW = (
      <path
        className="gem-piece"
        d={lineAsD([left, bottom, innerBottom, innerLeft])}
        fill={gemColor}
        stroke={gemColor}
        opacity={0.5}
      />
    );

    const gemPieceHeart = (
      <path
        className="gem-piece"
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

    const gem = [
      gemPieceSE,
      gemPieceSW,
      gemPieceNW,
      gemPieceNE,
      gemPieceHeart
    ].slice(0, gemPieces);
    const rockEl = gemPieces === 5 ? null : rock;
    const piece = [rockEl, gem];
    return <g className={selected ? "stone rotate" : "stone"}>{piece}</g>;
  }
}

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
