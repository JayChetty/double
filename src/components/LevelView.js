import React from "react";
import NextLevelButton from "./NextLevelButton";

const tempLevels = [1, 2, 3, 4, 5, 6];
export default function LevelView({
  levels,
  completedLevels,
  show,
  goToNextLevel
}) {
  const levelItems = levels.map((level, levelIndex) => {
    // const challengeItems = zone.map((level, levelIndex) => {
    const isNextLevel = levelIndex === completedLevels;
    const isCompleted = levelIndex < completedLevels;

    const nextLevelClass = isNextLevel ? "next-level" : null;
    const completed = isCompleted ? "completed-level" : null;

    // const clickAction = isNextLevel ? playNextLevel : null;
    const classes = `level ${nextLevelClass} ${completed}`;

    return <span className={classes}>{level}</span>;
    // });
    // return <div className="zone">{challengeItems}</div>;
  });

  // const levelItems = levels.map((zone, zoneIndex) => {
  //   const challengeItems = zone.map((level, levelIndex) => {
  //     const isNextLevel = zoneIndex * 3 + levelIndex === competedLevels + 1;
  //     const nextLevelClass = isNextLevel ? "next" : null;
  //     // const clickAction = isNextLevel ? playNextLevel : null;
  //     const classes = `level ${nextLevelClass}`;
  //
  //     return <span className={classes}>{level}</span>;
  //   });
  //   return <div className="zone">{challengeItems}</div>;
  // });
  const showClass = show ? "show" : null;
  const classes = `levels ${showClass}`;
  return (
    <div className={classes} onClick={goToNextLevel}>
      <div className="level-wrapper">
        {levelItems}
        <NextLevelButton />
      </div>
    </div>
  );
  // return <div className={classes}>LEVELs</div>;
}
