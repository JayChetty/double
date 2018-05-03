import React, { Fragment } from "react";
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
  deleteMove,
  showLevels,
  playLevel,
  resetClick
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
    <Fragment>
      <button
        disabled={stalled}
        className="button control"
        onClick={playMove("removeOne")}
      >
        {icons["removeOne"]}
      </button>
      <button
        disabled={stalled}
        className="button control"
        onClick={playMove("double")}
      >
        {icons["double"]}
      </button>
      <button
        disabled={stalled}
        className="button control"
        onClick={playMove("addOne")}
      >
        {icons["addOne"]}
      </button>
    </Fragment>
  );

  const deleteButton = (
    <button className="clear-button" onClick={deleteMove}>
      {"clear"}
    </button>
  );

  const maybeDeleteButton =
    moveList.length > 0 && best !== moveList.length ? deleteButton : null;

  const controlsClass = best === moveList.length ? "hidden" : null;

  // const levelControls = (
  //   <div className="controls">
  //     <div className="buttons">
  //       <button className={`button`} onClick={playLevel}>
  //         <span className="go-text">play</span>
  //       </button>
  //     </div>
  //     <button onClick={resetClick}>reset</button>
  //   </div>
  // );

  const mainControls = (
    <div className="controls">
      {maybeDeleteButton}
      <div className="move-display">{moveItems}</div>
      <div className={`buttons ${controlsClass}`}>{placeButtons}</div>
    </div>
  );

  const body = mainControls;

  return body;
}
