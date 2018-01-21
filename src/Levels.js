import React from "react";

export default function Levels({ levels, currentLevel }) {
  const levelItems = levels.map(level => {
    const classes = "level";
    return (
      <div className="level">
        {level.target} in {level.allowedMoves}
      </div>
    );
  });
  return <div className="levels">{levelItems}</div>;
}
