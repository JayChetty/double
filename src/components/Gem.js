import React from "react";
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

  const gemPieceNW = (
    <path
      className="gem-piece"
      d={lineAsD([left, top, innerTop, innerLeft])}
      fill={color}
      stroke={color}
      opacity={0.2}
    />
  );

  const gemPieceNE = (
    <path
      className="gem-piece"
      d={lineAsD([right, top, innerTop, innerRight])}
      fill={color}
      stroke={color}
      opacity={0.4}
    />
  );

  const gemPieceSE = (
    <path
      className="gem-piece"
      d={lineAsD([right, bottom, innerBottom, innerRight])}
      fill={color}
      stroke={color}
      opacity={0.55}
    />
  );

  const gemPieceSW = (
    <path
      className="gem-piece"
      d={lineAsD([left, bottom, innerBottom, innerLeft])}
      fill={color}
      stroke={color}
      opacity={0.5}
    />
  );

  const gemPieceHeart = (
    <path
      className="gem-piece"
      d={lineAsD([innerTop, innerRight, innerBottom, innerLeft])}
      fill={color}
      stroke={color}
      opacity={0.25}
    />
  );

  return [gemPieceSE, gemPieceSW, gemPieceNW, gemPieceNE, gemPieceHeart].slice(
    0,
    numPieces
  );
}
