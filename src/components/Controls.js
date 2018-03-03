import React from "react";
import icons from "./icons";
import { sequanceArray } from "./Grid";
export default function Controls({
  stalled,
  number,
  playMove,
  best,
  moveList,
  moves,
  go
}) {
  // const atZero = number === 0;
  const moveItems = sequanceArray(best).map(number => {
    const isActive = number == moves - 1;
    const classes = isActive ? "active-move" : null;
    const move = moveList[number] || "not set";
    return (
      <div className={classes} key={number}>
        {icons[move]}
      </div>
    );
  });

  const placeButtons = (
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

  const goButton = <button onClick={go}> go </button>;

  const controls = best === moveList.length ? goButton : placeButtons;
  return (
    <div className="controls">
      <div className="moves">{moveItems}</div>
      <div className="buttons">{controls}</div>
    </div>
  );
}
