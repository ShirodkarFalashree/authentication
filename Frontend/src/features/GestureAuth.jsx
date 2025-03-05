import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GestureAuth = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedPattern, setSavedPattern] = useState([]);
  const [currentPattern, setCurrentPattern] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setCurrentPattern([]);
    draw(e);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
    setCurrentPattern((prev) => [...prev, { x: offsetX, y: offsetY }]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setCurrentPattern([]);
  };

  const saveGesture = () => {
    if (currentPattern.length < 10) {
      alert("Please draw a more complex gesture!");
      return;
    }
    setSavedPattern(currentPattern);
    alert("Gesture saved! Try verifying now.");
  };

  const compareGestures = (pattern1, pattern2) => {
    if (!pattern1.length || !pattern2.length) return false;
    if (pattern1.length !== pattern2.length) return false;

    let totalDifference = 0;
    for (let i = 0; i < pattern1.length; i += 5) {
      const diffX = Math.abs(pattern1[i].x - pattern2[i].x);
      const diffY = Math.abs(pattern1[i].y - pattern2[i].y);
      totalDifference += diffX + diffY;
    }

    return totalDifference / (pattern1.length / 5) < 30; // More lenient matching
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
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Gesture Authentication</h2>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: "2px solid black",
          cursor: "crosshair",
          background: "white",
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={saveGesture} style={{ marginRight: "10px" }}>
          Save Gesture
        </button>
        <button onClick={verifyGesture}>Verify Gesture</button>
        <button onClick={resetCanvas} style={{ marginLeft: "10px" }}>
          Reset</button>
      </div>
    </div>
  );
};

export default GestureAuth;
