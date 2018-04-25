import React, { PureComponent } from "react";
import "./Stone.css";
import Gem from "./Gem";

import { lineAsD, randomLine } from "../lib/drawing";

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
    const { size, selected, isTarget, gemColor } = this.props;
    const { gemPieces } = this.state;

    const halfSize = size / 2;
    const gap = size / 5;

    const top = { x: halfSize, y: 0 };
    const right = { x: size, y: halfSize };
    const bottom = { x: halfSize, y: size };
    const left = { x: 0, y: halfSize };

    const noiseRange = 1;

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

    const rock = (
      <path
        d={d}
        fill={color}
        stroke={strokeColor}
        fill-opacity={opacity}
        strokeWidth={strokeWidth}
      />
    );

    const gem = <Gem numPieces={gemPieces} color={gemColor} size={size} />;
    const rockEl = gemPieces === 5 ? null : rock;
    const piece = [rockEl, gem];
    return <g className={selected ? "stone rotate" : "stone"}>{piece}</g>;
  }
}
