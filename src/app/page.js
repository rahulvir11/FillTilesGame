"use client";
import FillTilesGame from "@/components/FillTilesGame";
import { levels } from "@/constant/levels";
import { useState } from "react";

// Dynamic metadata for better SEO
export const dynamic = 'force-dynamic'

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
    <>
      {/* Additional meta tags for this specific page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Tiles Connect",
            "url": "https://tiles-connect.vercel.app",
            "description": "Play Tiles Connect - A modern puzzle game with beautiful glassmorphism design",
            "applicationCategory": "GameApplication",
            "operatingSystem": "Any",
            "permissions": "none",
            "memoryRequirements": "Low",
            "processorRequirements": "Any",
            "softwareRequirements": "Modern web browser with JavaScript enabled",
            "storageRequirements": "Minimal - runs entirely in browser"
          })
        }}
      />
      
      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        {/* Game Header with SEO-friendly structure */}
        <header className="mb-6 text-center" role="banner">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
            🎮 Tiles Connect
          </h1>
          <h2 className="text-white text-lg">
            {currentLevel?.name || `Level ${currentLevelIndex + 1}`}
          </h2>
          <p className="text-gray-300 text-sm mt-1" role="status" aria-live="polite">
            Level {currentLevelIndex + 1} of {levels.length}
          </p>
        </header>
        
        {/* Game Section with proper ARIA labels */}
        <section 
          className="game-container" 
          role="main" 
          aria-label="Tiles Connect Puzzle Game"
          aria-describedby="game-instructions"
        >
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
        </section>
        
        {/* Game Instructions for accessibility */}
        <aside id="game-instructions" className="sr-only">
          Use arrow keys or click to move. Connect all tiles to complete the level. 
          Avoid blocked tiles marked with prohibition signs.
        </aside>
        
        {/* Final Level Indicator */}
        {isLastLevel && (
          <footer className="mt-6 text-center" role="contentinfo">
            <p className="text-yellow-300 text-lg font-semibold" role="status">
              🏆 Final Level! You&apos;re almost there!
            </p>
          </footer>
        )}
        
        {/* Hidden elements for screen readers */}
        <div className="sr-only">
          <h2>About Tiles Connect</h2>
          <p>
            A modern puzzle game where you connect tiles to create a path. 
            Features beautiful glassmorphism design, 4 challenging levels, 
            and immersive sound effects. Perfect for brain training and relaxation.
          </p>
        </div>
      </main>
    </>
  );
}
