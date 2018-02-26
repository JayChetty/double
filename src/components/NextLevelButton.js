import React from "react";

export default function NextLevelButton({ goToNextLevel }) {
  return (
    <button className="next-level-button" onClick={goToNextLevel}>
      Play Next Level
    </button>
  );
}
