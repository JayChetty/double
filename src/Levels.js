import React from "react";

export default function Levels({
  levels,
  currentLevelIndex,
  show,
  playNextLevel
}) {
  console.log("level completed?", show);
  const levelItems = levels.map((level, index) => {
    const isNextLevel = index === currentLevelIndex + 1;
    const nextLevelClass = isNextLevel ? "next" : null;
    const clickAction = isNextLevel ? playNextLevel : null;
    const classes = `level ${nextLevelClass}`;

    return (
      <div className={classes} onClick={clickAction}>
        {level.target} in {level.allowedMoves}
      </div>
    );
  });
  const showClass = show ? "show" : null;
  const classes = `levels ${showClass}`;
  return <div className={classes}>{levelItems}</div>;
}
