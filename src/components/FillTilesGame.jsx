"use client";
import React, { useState, useEffect } from "react";

const FillTilesGame = ({ rows, cols, start, disabledTiles }) => {
  const [path, setPath] = useState([{ row: start.row, col: start.col }]);

  // check helpers
  const isDisabled = (r, c) =>
    disabledTiles.some((tile) => tile.row === r && tile.col === c);

  const findInPath = (r, c) =>
    path.findIndex((tile) => tile.row === r && tile.col === c);

  // keyboard movement
  const handleKeyDown = (e) => {
    const { row, col } = path[path.length - 1];
    let newPos = null;

    if (e.key === "ArrowUp") newPos = { row: row - 1, col };
    if (e.key === "ArrowDown") newPos = { row: row + 1, col };
    if (e.key === "ArrowLeft") newPos = { row, col: col - 1 };
    if (e.key === "ArrowRight") newPos = { row, col: col + 1 };

    if (!newPos) return;
    handleMove(newPos.row, newPos.col);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // main move logic (keyboard + mouse)
  const handleMove = (r, c) => {
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
      }
    } else {
      // already in path → undo forward
      setPath(path.slice(0, index + 1));
    }
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
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 40px)`,
        gap: "5px",
        background: "#2f2f3f",
        padding: "10px",
      }}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const disabled = isDisabled(r, c);
          const type = getTileType(r, c);

          let bg = "#888";
          if (disabled) bg = "#111";
          else if (type !== "empty") bg = "#ff4b5c";

          return (
            <div
              key={`${r}-${c}`}
              onClick={() => handleMove(r, c)}
              style={{
                width: "40px",
                height: "40px",
                background: bg,
                border: "2px solid #555",
                position: "relative",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              {/* Connectors */}
              {type.includes("up") && (
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: "25%",
                    width: "50%",
                    height: "100%",
                    background: "#ff4b5c",
                  }}
                />
              )}
              {type.includes("down") && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-50%",
                    left: "25%",
                    width: "50%",
                    height: "100%",
                    background: "#ff4b5c",
                  }}
                />
              )}
              {type.includes("left") && (
                <div
                  style={{
                    position: "absolute",
                    left: "-50%",
                    top: "25%",
                    width: "100%",
                    height: "50%",
                    background: "#ff4b5c",
                  }}
                />
              )}
              {type.includes("right") && (
                <div
                  style={{
                    position: "absolute",
                    right: "-50%",
                    top: "25%",
                    width: "100%",
                    height: "50%",
                    background: "#ff4b5c",
                  }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default FillTilesGame;
