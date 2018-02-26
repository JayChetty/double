import React from "react";
import NextLevelButton from "./NextLevelButton";

export default function LevelView({
  levels,
  competedLevels,
  show,
  goToNextLevel
}) {
  const levelItems = levels.map((zone, zoneIndex) => {
    const challengeItems = zone.map((level, levelIndex) => {
      const isNextLevel = zoneIndex * 3 + levelIndex === competedLevels + 1;
      const nextLevelClass = isNextLevel ? "next" : null;
      // const clickAction = isNextLevel ? playNextLevel : null;
      const classes = `level ${nextLevelClass}`;

      return <span className={classes}>{level}</span>;
    });
    return <div className="zone">{challengeItems}</div>;
  });
  const showClass = show ? "show" : null;
  const classes = `levels ${showClass}`;
  return (
    <div className={classes}>
      {levelItems}
      <NextLevelButton goToNextLevel={goToNextLevel} />
    </div>
  );
  // return <div className={classes}>LEVELs</div>;
}
