"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

const FillTilesGame = ({ rows, cols, start, disabledTiles, currentLevel, onNextLevel, onRestart }) => {
  const [path, setPath] = useState([{ row: start.row, col: start.col }]);
  const [startTime, setStartTime] = useState(Date.now());
  const [gameWon, setGameWon] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  
  // Audio refs for sound effects
  const connectSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const gridRef = useRef(null);

  // Initialize audio files
  useEffect(() => {
    // Create audio elements for the sound files
    connectSoundRef.current = new Audio('/connect.mp3');
    winSoundRef.current = new Audio('/victory.mp3');
    
    // Set volume levels
    connectSoundRef.current.volume = 0.3;
    winSoundRef.current.volume = 0.5;
    
    // Preload the audio files
    connectSoundRef.current.preload = 'auto';
    winSoundRef.current.preload = 'auto';
  }, []);

  // Check if game is won
  const checkWin = () => {
    const totalPlayableTiles = rows * cols - disabledTiles.length;
    return path.length === totalPlayableTiles;
  };

  // Win detection effect
  useEffect(() => {
    if (checkWin() && !gameWon) {
      setGameWon(true);
      setCompletionTime(Math.floor((Date.now() - startTime) / 1000));
      if (winSoundRef.current) {
        winSoundRef.current.currentTime = 0; // Reset to beginning
        winSoundRef.current.play().catch(e => console.log('Victory sound failed to play:', e));
      }
    }
  }, [path, gameWon, startTime]);

  // Reset game state when props change
  useEffect(() => {
    setPath([{ row: start.row, col: start.col }]);
    setStartTime(Date.now());
    setGameWon(false);
    setCompletionTime(0);
  }, [start, rows, cols]);

  // Touch and drag state for mobile
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(null);
  
  

  // check helpers
  const isDisabled = (r, c) =>
    disabledTiles.some((tile) => tile.row === r && tile.col === c);

  const findInPath = (r, c) =>
    path.findIndex((tile) => tile.row === r && tile.col === c);

  // main move logic (keyboard + mouse)
  const handleMove = useCallback((r, c) => {
    if (gameWon) return; // Prevent moves after winning
    
    // boundaries
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    // blocked
    if (isDisabled(r, c)) return;

    const index = findInPath(r, c);

    if (index === -1) {
      // not visited → add new step
      const last = path[path.length - 1];
      const isAdjacent =
        (Math.abs(last.row - r) === 1 && last.col === c) ||
        (Math.abs(last.col - c) === 1 && last.row === r);

      if (isAdjacent) {
        setPath([...path, { row: r, col: c }]);
        // Play connect sound
        if (connectSoundRef.current) {
          connectSoundRef.current.currentTime = 0; // Reset to beginning
          connectSoundRef.current.play().catch(e => console.log('Connect sound failed to play:', e));
        }
      }
    } else {
      // already in path → undo forward
      setPath(path.slice(0, index + 1));
    }
  }, [gameWon, rows, cols, disabledTiles, path]);

  // keyboard movement
  const handleKeyDown = useCallback((e) => {
    const { row, col } = path[path.length - 1];
    let newPos = null;

    if (e.key === "ArrowUp") newPos = { row: row - 1, col };
    if (e.key === "ArrowDown") newPos = { row: row + 1, col };
    if (e.key === "ArrowLeft") newPos = { row, col: col - 1 };
    if (e.key === "ArrowRight") newPos = { row, col: col + 1 };

    if (!newPos) return;
    handleMove(newPos.row, newPos.col);
  }, [path, handleMove]);

  // Touch event handlers for mobile support
  const handleTouchStart = useCallback((e) => {
    if (e.cancelable) {
      e.preventDefault(); // Prevent scrolling and zooming only if event is cancelable
    }
    if (gameWon) return;
    
    const target = e.target.closest('[data-row]');
    if (!target) return;
    
    const r = parseInt(target.dataset.row);
    const c = parseInt(target.dataset.col);
    
    setIsDragging(true);
    setDragStartPos({ row: r, col: c });
    handleMove(r, c);
  }, [gameWon, handleMove]);

  const handleTouchMove = useCallback((e) => {
    if (e.cancelable) {
      e.preventDefault(); // Prevent scrolling only if event is cancelable
    }
    if (!isDragging || gameWon) return;

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.dataset.row && element.dataset.col) {
      const r = parseInt(element.dataset.row);
      const c = parseInt(element.dataset.col);
      
      // Only move if we're on a different tile
      const lastPos = path[path.length - 1];
      if (r !== lastPos.row || c !== lastPos.col) {
        handleMove(r, c);
      }
    }
  }, [isDragging, gameWon, path, handleMove]);

  const handleTouchEnd = useCallback((e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    setIsDragging(false);
    setDragStartPos(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    
    // Add proper touch event listeners with passive: false to allow preventDefault
    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener("touchstart", handleTouchStart, { passive: false });
      gridElement.addEventListener("touchmove", handleTouchMove, { passive: false });
      gridElement.addEventListener("touchend", handleTouchEnd, { passive: false });
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (gridElement) {
        gridElement.removeEventListener("touchstart", handleTouchStart);
        gridElement.removeEventListener("touchmove", handleTouchMove);
        gridElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]); // Add dependencies

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get congratulation message based on time
  const getCongratulationMessage = (time) => {
    if (time < 30) return "🏆 AMAZING! Lightning fast!";
    if (time < 60) return "⭐ EXCELLENT! Well done!";
    if (time < 120) return "👍 GREAT JOB! Keep it up!";
    return "🎉 CONGRATULATIONS! You did it!";
  };

  // detect connection type for each tile
  const getTileType = (r, c) => {
    const index = findInPath(r, c);
    if (index === -1) return "empty";

    if (index === 0) return "start";

    const prev = path[index - 1];
    const next = path[index + 1];

    const dirs = [];
    if (prev) {
      if (prev.row < r) dirs.push("up");
      if (prev.row > r) dirs.push("down");
      if (prev.col < c) dirs.push("left");
      if (prev.col > c) dirs.push("right");
    }
    if (next) {
      if (next.row < r) dirs.push("up");
      if (next.row > r) dirs.push("down");
      if (next.col < c) dirs.push("left");
      if (next.col > c) dirs.push("right");
    }

    return dirs.sort().join("-");
  };

  return (
    <div style={{ position: "relative" , width: "100%", height: "100vh", boxSizing: "border-box" }}>
      {/* Game Stats Bar */}
      <div style={{
        background: "linear-gradient(135deg, rgba(30, 30, 50, 0.95), rgba(60, 30, 80, 0.95))",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        padding: "15px 25px",
        marginBottom: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ color: "#fff", fontSize: "14px" }}>
            <span style={{ opacity: 0.7 }}>Progress: </span>
            <span style={{ color: "#00ff88", fontWeight: "bold" }}>
              {path.length}/{rows * cols - disabledTiles.length}
            </span>
          </div>
          <div style={{ color: "#fff", fontSize: "14px" }}>
            <span style={{ opacity: 0.7 }}>Time: </span>
            <span style={{ color: "#ffaa00", fontWeight: "bold" }}>
              {formatTime(Math.floor((Date.now() - startTime) / 1000))}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        
          <div style={{ 
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "16px",
            fontWeight: "bold"
          }}>
            Level {currentLevel || 1}
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div
        ref={gridRef}
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 50px)`,
          gap: "8px",
          background: "linear-gradient(135deg, rgba(20, 20, 40, 0.9), rgba(40, 20, 60, 0.9))",
          backdropFilter: "blur(20px)",
          padding: "25px",
          borderRadius: "25px",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          touchAction: "none", // Prevent default touch behaviors
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const disabled = isDisabled(r, c);
            const type = getTileType(r, c);
            const isInCurrentPath = type !== "empty";
            const pathIndex = findInPath(r, c);

            // Enhanced styling for different tile states
            let tileStyle = {
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              border: "2px solid",
              position: "relative",
              cursor: disabled ? "not-allowed" : gameWon ? "default" : "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
              overflow: "visible",
            };

            if (disabled) {
              tileStyle = {
                ...tileStyle,
                background: "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
                borderColor: "#333",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.5)",
              };
            } else if (type === "start") {
              tileStyle = {
                ...tileStyle,
                background: "linear-gradient(135deg, #00ff88, #00cc6a)",
                borderColor: "#00ff88",
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2)",
                transform: "scale(1.05)",
                color: "#fff",
                animation: "pulse 2s infinite",
              };
            } else if (isInCurrentPath) {
              const intensity = 1 - (pathIndex / path.length) * 0.3;
              tileStyle = {
                ...tileStyle,
                background: `linear-gradient(135deg, 
                  hsl(${320 + pathIndex * 10}, 70%, ${60 * intensity}%), 
                  hsl(${340 + pathIndex * 10}, 80%, ${45 * intensity}%))`,
                borderColor: `hsl(${320 + pathIndex * 10}, 80%, 70%)`,
                boxShadow: `0 0 25px hsla(${320 + pathIndex * 10}, 70%, 60%, 0.6), 0 4px 15px rgba(0, 0, 0, 0.3)`,
                transform: "scale(1.02)",
                color: "#fff",
              };
            } else {
              tileStyle = {
                ...tileStyle,
                background: "linear-gradient(135deg, rgba(100, 100, 120, 0.3), rgba(60, 60, 80, 0.3))",
                borderColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              };
            }

            // Hover effect
            const onMouseEnter = (e) => {
              if (!disabled && !gameWon) {
                e.target.style.transform = (tileStyle.transform || "") + " translateY(-2px)";
                e.target.style.boxShadow = tileStyle.boxShadow + ", 0 8px 25px rgba(0, 0, 0, 0.3)";
              }
            };

            const onMouseLeave = (e) => {
              if (!disabled && !gameWon) {
                e.target.style.transform = tileStyle.transform || "";
                e.target.style.boxShadow = tileStyle.boxShadow || "";
              }
            };

            return (
              <div
                key={`${r}-${c}`}
                data-row={r}
                data-col={c}
                onClick={() => handleMove(r, c)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{
                  ...tileStyle,
                  touchAction: "none", // Prevent scrolling on touch
                  userSelect: "none",  // Prevent text selection
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none", // Disable iOS callout
                  WebkitTapHighlightColor: "transparent", // Remove tap highlight
                }}
              >
                {/* Tile Content */}
                {type === "start" && "🎯"}
                {disabled && "🚫"}
                {isInCurrentPath && type !== "start" && (
                  <span style={{ 
                    background: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    animation: "fadeIn 0.3s ease-out"
                  }}>
                    {pathIndex + 1}
                  </span>
                )}

                {/* Enhanced Connectors with glow effects */}
                {type.includes("up") && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-29px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px",
                      height: "29px",
                      background: `linear-gradient(180deg, 
                        hsl(${320 + pathIndex * 10}, 80%, 60%), 
                        hsl(${340 + pathIndex * 10}, 90%, 50%))`,
                      borderRadius: "3px",
                      boxShadow: `0 0 15px hsl(${320 + pathIndex * 10}, 80%, 60%)`,
                      animation: "connectionGlow 1s ease-in-out"
                    }}
                  />
                )}
                {type.includes("down") && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-29px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px",
                      height: "29px",
                      background: `linear-gradient(180deg, 
                        hsl(${320 + pathIndex * 10}, 80%, 60%), 
                        hsl(${340 + pathIndex * 10}, 90%, 50%))`,
                      borderRadius: "3px",
                      boxShadow: `0 0 15px hsl(${320 + pathIndex * 10}, 80%, 60%)`,
                      animation: "connectionGlow 1s ease-in-out"
                    }}
                  />
                )}
                {type.includes("left") && (
                  <div
                    style={{
                      position: "absolute",
                      left: "-29px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "29px",
                      height: "6px",
                      background: `linear-gradient(90deg, 
                        hsl(${320 + pathIndex * 10}, 80%, 60%), 
                        hsl(${340 + pathIndex * 10}, 90%, 50%))`,
                      borderRadius: "3px",
                      boxShadow: `0 0 15px hsl(${320 + pathIndex * 10}, 80%, 60%)`,
                      animation: "connectionGlow 1s ease-in-out"
                    }}
                  />
                )}
                {type.includes("right") && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-29px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "29px",
                      height: "6px",
                      background: `linear-gradient(90deg, 
                        hsl(${320 + pathIndex * 10}, 80%, 60%), 
                        hsl(${340 + pathIndex * 10}, 90%, 50%))`,
                      borderRadius: "3px",
                      boxShadow: `0 0 15px hsl(${320 + pathIndex * 10}, 80%, 60%)`,
                      animation: "connectionGlow 1s ease-in-out"
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Enhanced Win Modal */}
      {gameWon && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "transparent",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "modalFadeIn 0.5s ease-out",
           borderRadius: "20px",
          }}
        >
          {/* Floating particles background */}
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255, 170, 0, 0.1) 0%, transparent 50%)
            `
          }} />
          
          <div
            style={{
              background: "linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(60, 30, 80, 0.95))",
              backdropFilter: "blur(30px)",
              padding: "50px",
              borderRadius: "30px",
              textAlign: "center",
              color: "#fff",
              maxWidth: "500px",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              animation: "modalSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: "relative",
              overflow: "visible"
            }}
          >
            {/* Celebration Animation */}
            <div style={{ 
              fontSize: "50px", 
              marginBottom: "10px",
              animation: "celebrationBounce 2s infinite",
              filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))"
            }}>
              🎉
            </div>
            
            {/* Animated Title */}
            <h2 style={{ 
              margin: "0 0 10px 0", 
              fontSize: "24px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B, #4ECDC4)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease infinite",
              textShadow: "none",
              filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))"
            }}>
              LEVEL COMPLETE!
            </h2>
            
            {/* Animated Subtitle */}
            <p style={{ 
              fontSize: "20px", 
              margin: "20px 0",
              background: "linear-gradient(45deg, #fff, #e0e0e0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "textGlow 2s ease-in-out infinite alternate"
            }}>
              {getCongratulationMessage(completionTime)}
            </p>
            
            {/* Enhanced Stats Panel */}
            <div style={{ 
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))", 
              padding: "25px", 
              borderRadius: "20px", 
              margin: "30px 0",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>⏱️</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffaa00" }}>
                    {formatTime(completionTime)}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>Time</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>🎯</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#4ecdc4" }}>
                    {currentLevel || 1}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>Level</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>🔥</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#00ff88" }}>
                    {path.length}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>Tiles</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={onRestart}
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                  color: "#fff",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  padding: "5px 10px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))";
                  e.target.style.transform = "translateY(-3px) scale(1.05)";
                  e.target.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))";
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
                }}
              >
                🔄 Restart Level
              </button>
              {onNextLevel && (
                <button
                  onClick={onNextLevel}
                  style={{
                    background: "linear-gradient(135deg, #ff6b6b, #4ecdc4)",
                    color: "#fff",
                    border: "none",
                    padding: "8px 8px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    boxShadow: "0 8px 30px rgba(255, 107, 107, 0.4)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px) scale(1.05)";
                    e.target.style.boxShadow = "0 12px 40px rgba(255, 107, 107, 0.6)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                    e.target.style.boxShadow = "0 8px 30px rgba(255, 107, 107, 0.4)";
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>🚀 Next Level</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      

      {/* Enhanced CSS Animations */}
      <style jsx>{`
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
        
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes celebrationBounce {
          0%, 20%, 60%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          40% {
            transform: translateY(-30px) rotate(10deg);
          }
          80% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes textGlow {
          from {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
          }
          to {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 50px rgba(0, 255, 136, 0.8), 0 4px 25px rgba(0, 0, 0, 0.3);
          }
          100% {
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2);
          }
        }
        
        @keyframes connectionGlow {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        /* Real-time progress animation */
        @keyframes progressShine {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FillTilesGame;
