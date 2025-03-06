import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../component/ui/SpotlightCard";
import Aurora from "../component/ui/Aurora";

const GRID_SIZE = 3; // 3x3 grid
const DOT_RADIUS = 5;
const DOT_SPACING = 80; // Space between dots

const GestureAuth = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [savedPattern, setSavedPattern] = useState(JSON.parse(localStorage.getItem("gesture")) || []);
  const [currentPattern, setCurrentPattern] = useState([]);
  const [isResetting, setIsResetting] = useState(false); // Flag to handle reset mode
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = GRID_SIZE * DOT_SPACING;
    canvas.height = GRID_SIZE * DOT_SPACING;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctxRef.current = ctx;
    drawGrid();
  }, []);

  const drawGrid = () => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const x = col * DOT_SPACING + DOT_SPACING / 2;
        const y = row * DOT_SPACING + DOT_SPACING / 2;
        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  };

  const getNearestDot = (x, y) => {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const dotX = col * DOT_SPACING + DOT_SPACING / 2;
        const dotY = row * DOT_SPACING + DOT_SPACING / 2;
        const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);
        if (distance < DOT_SPACING / 2) return { row, col, x: dotX, y: dotY };
      }
    }
    return null;
  };

  const clearCanvas = () => {
    setCurrentPattern([]);
    drawGrid();
  };

  const startDrawing = (e) => {
    setCurrentPattern([]);
    clearCanvas();
    const dot = getNearestDot(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    if (dot) {
      setCurrentPattern([dot]);
    }
  };

  const drawLine = (from, to) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const draw = (e) => {
    if (currentPattern.length === 0) return;
    const dot = getNearestDot(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    if (dot && !currentPattern.find((p) => p.row === dot.row && p.col === dot.col)) {
      drawLine(currentPattern[currentPattern.length - 1], dot);
      setCurrentPattern((prev) => [...prev, dot]);
    }
  };

  const saveGesture = () => {
    if (currentPattern.length < 3) {
      alert("Please create a more complex gesture.");
      return;
    }
    localStorage.setItem("gesture", JSON.stringify(currentPattern));
    alert("Gesture saved! Refreshing...");
    window.location.reload();
  };

  const compareGestures = (pattern1, pattern2) => {
    if (pattern1.length !== pattern2.length) return false;
    return pattern1.every((p, i) => p.row === pattern2[i].row && p.col === pattern2[i].col);
  };

  const verifyGesture = () => {
    if (!savedPattern.length) {
      alert("Please save a gesture first!");
      return;
    }
    if (compareGestures(savedPattern, currentPattern)) {
      alert("Gesture Matched! Redirecting...");
      navigate("/dashboard");
    } else {
      alert("Gesture did not match, try again.");
    }
    clearCanvas();
  };

  const handleResetGesture = () => {
    if (!isResetting) {
      alert("Draw your current gesture to confirm reset.");
      setIsResetting(true);
      clearCanvas();
      return;
    }

    if (compareGestures(savedPattern, currentPattern)) {
      localStorage.removeItem("gesture");
      setSavedPattern([]);
      alert("Gesture reset successfully! Refreshing...");
      window.location.reload();
    } else {
      alert("Incorrect gesture! Reset failed.");
    }
    setIsResetting(false);
    clearCanvas();
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center p-8 bg-black">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
          blend={1}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Gesture Authentication Card */}
      <SpotlightCard className="w-96 p-6 text-white text-center flex flex-col items-center">
        {!savedPattern.length ? (
          <>
            <h2 className="text-xl font-semibold">🖋 Set Your Gesture</h2>
            <p className="text-sm text-neutral-400 mt-2">
              Connect the dots in a unique pattern to save your gesture.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">🔒 Verify Gesture</h2>
            <p className="text-sm text-neutral-400 mt-2">
              Draw your saved gesture to log in.
            </p>
          </>
        )}

        {/* Centered Canvas (Gesture Board) */}
        <div className="flex items-center justify-center mt-4">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={() => setCurrentPattern([...currentPattern])}
            className="border-2 border-white cursor-crosshair bg-gray-900 rounded-lg"
          />
        </div>

        {/* Buttons Section */}
        <div className="mt-4 flex flex-col gap-3 w-full">
          {!savedPattern.length ? (
            <button
              onClick={saveGesture}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              💾 Save Gesture
            </button>
          ) : (
            <>
              <button
                onClick={verifyGesture}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                ✅ Verify Gesture
              </button>
              <button
                onClick={handleResetGesture}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                🔄 {isResetting ? "Confirm Reset" : "Reset Gesture"}
              </button>
            </>
          )}
          <button
            onClick={clearCanvas}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            🧹 Clear Dots
          </button>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default GestureAuth;
