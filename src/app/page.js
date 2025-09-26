"use client";
import FillTilesGame from "@/components/FillTilesGame";
import { levels } from "@/constant/levels";
import { useState } from "react";

export default function Home() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  
  const currentLevel = levels[currentLevelIndex];
  const isLastLevel = currentLevelIndex >= levels.length - 1;

  const handleNextLevel = () => {
    if (!isLastLevel) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
  };

  const handleRestart = () => {
    // Reset to first level
    setCurrentLevelIndex(0);
  };

  const restartCurrentLevel = () => {
    // Force re-render of current level by updating key
    setCurrentLevelIndex(currentLevelIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
          🎮 Tiles Connect
        </h1>
        <p className="text-white text-lg">
          {currentLevel?.name || `Level ${currentLevelIndex + 1}`}
        </p>
        <p className="text-gray-300 text-sm mt-1">
          Level {currentLevelIndex + 1} of {levels.length}
        </p>
      </div>
      
      <FillTilesGame
        key={`level-${currentLevelIndex}-${Date.now()}`} // Force re-render on level change
        rows={currentLevel.rows}
        cols={currentLevel.cols}
        start={currentLevel.start}
        disabledTiles={currentLevel.disabledTiles}
        currentLevel={currentLevelIndex + 1}
        onNextLevel={!isLastLevel ? handleNextLevel : null}
        onRestart={restartCurrentLevel}
      />
      
      {isLastLevel && (
        <div className="mt-6 text-center">
          <p className="text-yellow-300 text-lg font-semibold">
            🏆 Final Level! You're almost there!
          </p>
        </div>
      )}
    </div>
  );
}
