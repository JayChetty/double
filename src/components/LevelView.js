import React from "react";

export default function LevelView({ levels, competedLevels, show }) {
  const levelItems = levels.map((zone, zoneIndex) => {
    const challengeItems = zone.map((level, levelIndex) => {
      const isNextLevel = zoneIndex * 3 + levelIndex === competedLevels + 1;
      const nextLevelClass = isNextLevel ? "next" : null;
      // const clickAction = isNextLevel ? playNextLevel : null;
      const classes = `level ${nextLevelClass}`;

      return <span className={classes}>{level}</span>;
    });
    return <div>{challengeItems}</div>;
  });
  const showClass = show ? "show" : null;
  const classes = `levels ${showClass}`;
  return <div className={classes}>{levelItems}</div>;
  // return <div className={classes}>LEVELs</div>;
}
