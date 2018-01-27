import React from "react";

export default function Controls({ stalled, removeOne, double, addOne }) {
  return (
    <div className="buttons">
      <button disabled={stalled} className="button" onClick={removeOne}>
        -
      </button>
      <button disabled={stalled} className="button large" onClick={double}>
        x2
      </button>
      <button disabled={stalled} className="button" onClick={addOne}>
        +
      </button>
    </div>
  );
}
