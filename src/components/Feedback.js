import React from "react";

export default function Levels({ moves, atTarget, minMoves }) {
  const minMovesEl = atTarget ? <span> Min Moves {minMoves}</span> : null;
  return (
    <div className="feedback">
      Moves <span>{moves}</span>
      {minMovesEl}
    </div>
  );
}
