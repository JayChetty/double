import React from "react";

export default function Controls({ stalled, playMove }) {
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
        className="button large"
        onClick={playMove("double")}
      >
        x2
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
