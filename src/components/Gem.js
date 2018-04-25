import React from "react";
import "./Gem.css";
import { lineAsD } from "../lib/drawing";
export default function Gem({ numPieces, color, size }) {
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

  const gemColor = "#0F52BA";
  const strokeOpacity = 0.5;
  const gemPieceNW = (
    <path
      className="gem-piece"
      d={lineAsD([left, top, innerTop, innerLeft])}
      fill={color}
      stroke={color}
      fillOpacity={0.2}
      strokeOpacity={strokeOpacity}
    />
  );

  const gemPieceNE = (
    <path
      className="gem-piece"
      d={lineAsD([right, top, innerTop, innerRight])}
      fill={color}
      stroke={color}
      fillOpacity={0.4}
      strokeOpacity={strokeOpacity}
    />
  );

  const gemPieceSE = (
    <path
      className="gem-piece"
      d={lineAsD([right, bottom, innerBottom, innerRight])}
      fill={color}
      stroke={color}
      fillOpacity={0.55}
      strokeOpacity={strokeOpacity}
    />
  );

  const gemPieceSW = (
    <path
      className="gem-piece"
      d={lineAsD([left, bottom, innerBottom, innerLeft])}
      fill={color}
      stroke={color}
      fillOpacity={0.5}
      strokeOpacity={strokeOpacity}
    />
  );

  const gemPieceHeart = (
    <path
      className="gem-piece"
      d={lineAsD([innerTop, innerRight, innerBottom, innerLeft])}
      fill={color}
      stroke={color}
      fillOpacity={0.3}
      strokeOpacity={strokeOpacity}
    />
  );

  const pieces = [
    gemPieceSE,
    gemPieceSW,
    gemPieceNW,
    gemPieceNE,
    gemPieceHeart
  ].slice(0, numPieces);

  return <svg className="gem">{pieces}</svg>;
}
