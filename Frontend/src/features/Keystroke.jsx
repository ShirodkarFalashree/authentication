import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../component/ui/SpotlightCard";
import Aurora from "../component/ui/Aurora";

const Keystroke = () => {
  const [keystrokes, setKeystrokes] = useState([]);
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    const timestamp = Date.now();
    setKeystrokes((prev) => [...prev, { key: event.key, timestamp }]);
  };

  const analyzeKeystrokes = () => {
    if (keystrokes.length > 5) {
      const intervals = keystrokes
        .map((k, i) => (i > 0 ? k.timestamp - keystrokes[i - 1].timestamp : null))
        .filter(Boolean);

      const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

      console.log("Keystroke Intervals:", intervals);
      console.log("Average Interval:", averageInterval);

      if (averageInterval > 50 && averageInterval < 500) {
        window.location.href = "https://favmedia.vercel.app/";
      } else {
        alert("Typing pattern does not match human behavior");
      }
    } else {
      alert("Keystroke pattern not sufficient to verify human identity");
    }
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

      {/* Keystroke Verification Card */}
      <SpotlightCard className="w-96 p-6 text-white text-center">
        <h2 className="text-xl font-semibold">Keystroke Dynamics Authentication</h2>
        <p className="text-sm text-neutral-400 mt-2">
          Type a few words below to verify your typing pattern.
        </p>

        <input
          type="text"
          placeholder="Start typing..."
          onKeyDown={handleKeyDown}
          className="mt-4 w-full p-2 bg-transparent border border-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={analyzeKeystrokes}
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </SpotlightCard>
    </div>
  );
};

export default Keystroke;
