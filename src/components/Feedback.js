import React from "react";

export default function Levels({ moves, atTarget, minMoves }) {
  const minMovesEl = atTarget ? (
    <div className="min-moves"> Min Moves {minMoves}</div>
  ) : null;
  return (
    <div className="feedback">
      Moves <span className="moves">{moves}</span>
      {minMovesEl}
    </div>
  );
}
