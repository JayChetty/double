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
      <div className={`move-piece ${classes}`} key={number}>
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
        {icons["removeOne"]}
      </button>
      <button
        disabled={stalled}
        className="button"
        onClick={playMove("double")}
      >
        {icons["double"]}
      </button>
      <button
        disabled={stalled}
        className="button"
        onClick={playMove("addOne")}
      >
        {icons["addOne"]}
      </button>
    </div>
  );

  const goButton = (
    <button className="button" onClick={go}>
      {" "}
      go{" "}
    </button>
  );

  const controls = best === moveList.length ? goButton : placeButtons;
  return (
    <div className="controls">
      <div className="move-display">{moveItems}</div>
      <div className="buttons">{controls}</div>
    </div>
  );
}
