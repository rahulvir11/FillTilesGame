"use client";
import FillTilesGame from "@/components/FillTilesGame";
import { levels } from "@/constant/levels";
import { useState, useEffect } from "react";

// Dynamic metadata for better SEO
export const dynamic = 'force-dynamic'

export default function Home() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  // Instructions modal state
  const [showInstructions, setShowInstructions] = useState(false);

  // Load saved level from localStorage on component mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('tilesGameCurrentLevel');
    if (savedLevel) {
      const levelNumber = parseInt(savedLevel, 10);
      // Convert level number to index (level 1 = index 0)
      const levelIndex = Math.max(0, Math.min(levelNumber - 1, levels.length - 1));
      setCurrentLevelIndex(levelIndex);
    }
  }, []);

  // Save level to localStorage whenever currentLevelIndex changes
  useEffect(() => {
    // Convert index to level number (index 0 = level 1)
    const levelNumber = currentLevelIndex + 1;
    localStorage.setItem('tilesGameCurrentLevel', levelNumber.toString());
  }, [currentLevelIndex]);

  const currentLevel = levels[currentLevelIndex];
  const isLastLevel = currentLevelIndex >= levels.length - 1;

  const handleNextLevel = () => {
    if (!isLastLevel) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
  };


  // Function to reset game progress completely
  const resetGameProgress = () => {
    setCurrentLevelIndex(0);
    localStorage.removeItem('tilesGameCurrentLevel');
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
        
        {/* Game Section with proper ARIA labels - Perfectly Centered */}
        <section 
          className="w-full flex items-center justify-center px-4" 
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
            onGameReset={resetGameProgress}
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
        {/* Instructions Button - Centered at top */}
        <div style={{
          position: "fixed",
          top: "20px",
          left: "10%",
          transform: "translateX(-50%)",
          zIndex: 1000
        }}>
          <button
            onClick={() => setShowInstructions(true)}
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50px",
              padding: "10px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#fff",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              gap: "8px"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))";
              e.target.style.transform = "translateY(-2px) scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))";
              e.target.style.transform = "translateY(0) scale(1)";
            }}
          >
            ❓ 
          </button>
        </div>
          {/* Instructions Modal */}
      {showInstructions && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0", 
            bottom: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            animation: "modalFadeIn 0.3s ease-out",
          }}
          onClick={() => setShowInstructions(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(60, 30, 80, 0.95))",
              backdropFilter: "blur(30px)",
              padding: "40px",
              borderRadius: "25px",
              textAlign: "left",
              color: "#fff",
              maxWidth: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              animation: "modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowInstructions(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "18px",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "scale(1)";
              }}
            >
              ×
            </button>

            {/* Title */}
            <h2 style={{
              margin: "0 0 25px 0",
              fontSize: "28px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B, #4ECDC4)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease infinite",
              textAlign: "center"
            }}>
              🎮 How to Play
            </h2>

            {/* Game Instructions */}
            <div style={{ lineHeight: "1.6" }}>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  color: "#00ff88",
                  fontSize: "18px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  🎯 Objective
                </h3>
                <p style={{ margin: "0", opacity: 0.9 }}>
                  Connect all playable tiles by creating a continuous path. Fill every available space to complete the level!
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  color: "#4ecdc4",
                  fontSize: "18px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  🖱️ Controls
                </h3>
                <div style={{ margin: "0", opacity: 0.9 }}>
                  <p style={{ margin: "5px 0" }}>• <strong>Desktop:</strong> Click on adjacent tiles or use arrow keys</p>
                  <p style={{ margin: "5px 0" }}>• <strong>Mobile:</strong> Tap and drag across tiles</p>
                  <p style={{ margin: "5px 0" }}>• <strong>Undo:</strong> Click on a previous tile in your path</p>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  color: "#ffaa00",
                  fontSize: "18px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  🧩 Game Elements
                </h3>
                <div style={{ margin: "0", opacity: 0.9 }}>
                  <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>🎯</span> 
                    <strong>Start Tile:</strong> Your starting point (green with target icon)
                  </p>
                  <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      width: "20px",
                      height: "20px",
                      background: "linear-gradient(135deg, hsl(320, 70%, 60%), hsl(340, 80%, 45%))",
                      borderRadius: "4px",
                      display: "inline-block"
                    }}></span>
                    <strong>Path Tiles:</strong> Connected tiles with numbers showing order
                  </p>
                  <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>🚫</span>
                    <strong>Blocked Tiles:</strong> Cannot be used in your path
                  </p>
                  <p style={{ margin: "5px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      width: "6px",
                      height: "20px",
                      background: "linear-gradient(180deg, hsl(330, 80%, 60%), hsl(350, 90%, 50%))",
                      borderRadius: "3px",
                      display: "inline-block",
                      boxShadow: "0 0 10px hsl(330, 80%, 60%)"
                    }}></span>
                    <strong>Connectors:</strong> Visual links between connected tiles
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  color: "#ff6b6b",
                  fontSize: "18px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  💡 Tips & Strategy
                </h3>
                <div style={{ margin: "0", opacity: 0.9 }}>
                  <p style={{ margin: "5px 0" }}>• Plan your route before starting</p>
                  <p style={{ margin: "5px 0" }}>• You can only move to adjacent tiles (up, down, left, right)</p>
                  <p style={{ margin: "5px 0" }}>• Click on earlier tiles in your path to backtrack</p>
                  <p style={{ margin: "5px 0" }}>• Try to avoid creating dead ends</p>
                  <p style={{ margin: "5px 0" }}>• Complete faster for better scores!</p>
                </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                padding: "20px",
                borderRadius: "15px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "center",
                marginTop: "25px"
              }}>
                <p style={{ margin: "0", fontSize: "16px", opacity: 0.9 }}>
                  <strong>🎉 Good luck and have fun!</strong>
                </p>
                <p style={{ margin: "10px 0 0 0", fontSize: "14px", opacity: 0.7 }}>
                  Click anywhere outside this box to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional CSS for perfect centering */}
      <style jsx global>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(-100px) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Ensure modals are always perfectly centered */
        .modal-overlay {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        /* Responsive centering for game container */
        @media (max-width: 768px) {
          .game-container {
            padding: 10px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
