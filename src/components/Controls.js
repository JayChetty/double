import React from "react";

export default function Controls({ stalled, number, playMove }) {
  // const atZero = number === 0;
  return (
    <div className="buttons">
      <button
        disabled={stalled}
        className="button"
        onClick={playMove("removeOne")}
      >
        -
      </button>
      <button
        disabled={stalled}
        className="button"
        onClick={playMove("double")}
      >
        x
      </button>
      <button
        disabled={stalled}
        className="button"
        onClick={playMove("addOne")}
      >
        +
      </button>
    </div>
  );
}
