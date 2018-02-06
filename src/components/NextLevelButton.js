import React from "react";

export default function NextLevelButton({ goToNextLevel }) {
  return (
    <div className="buttons">
      <button className="next-leve-button" onClick={goToNextLevel}>
        Play Next Level
      </button>
    </div>
  );
}
