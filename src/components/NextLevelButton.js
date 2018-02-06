import React from "react";

export default function NextLevelButton({ goToNextLevel }) {
  return (
    <div className="buttons">
      <button className="button next-level-button" onClick={goToNextLevel}>
        Play Next Level
      </button>
    </div>
  );
}
