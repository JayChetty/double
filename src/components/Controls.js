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
  go,
  deleteMove
}) {
  // const atZero = number === 0;
  const moveItems = sequanceArray(best).map(number => {
    const isActive = number === moves - 1;
    const activeClass = isActive ? "active-move" : null;
    const move = moveList[number] || null;
    const definedClass = move ? "defined-move" : null;
    return (
      <div className={`move-piece ${activeClass} ${definedClass}`} key={number}>
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

  const deleteButton = (
    <button className="clear-button" onClick={deleteMove}>
      {"clear"}
    </button>
  );

  const maybeDeleteButton = moveList.length > 0 ? deleteButton : null;

  const goButton = (
    <div className="buttons">
      <button className="button" onClick={go}>
        <span className="go-text">go</span>
      </button>
    </div>
  );

  const controls = best === moveList.length ? goButton : placeButtons;
  return (
    <div className="controls">
      {maybeDeleteButton}
      <div className="move-display">{moveItems}</div>
      <div className="buttons">{controls}</div>
    </div>
  );
}
