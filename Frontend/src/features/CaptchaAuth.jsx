import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../component/ui/SpotlightCard";
import Aurora from "../component/ui/Aurora";

const CaptchaAuth = () => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  // Function to generate a random captcha
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomCaptcha = "";
    for (let i = 0; i < 6; i++) {
      randomCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(randomCaptcha);
  };

  useEffect(() => {
    generateCaptcha(); // Generate captcha on component mount
  }, []);

  // Verify if user input matches captcha
  const verifyCaptcha = () => {
    if (userInput === captcha) {
      alert("Captcha verified! Redirecting...");
      window.location.href = "https://favmedia.vercel.app/";
    } else {
      alert("Captcha incorrect! Try again.");
      setUserInput("");
      generateCaptcha(); // Generate a new captcha if incorrect
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

      {/* CAPTCHA Authentication Card */}
      <SpotlightCard className="w-96 p-6 text-white text-center">
        <h2 className="text-xl font-semibold">CAPTCHA Authentication</h2>
        <p className="text-sm text-neutral-400 mt-2">
          Enter the text below to verify your identity.
        </p>

        <div className="mt-4 text-2xl font-bold tracking-widest bg-gray-800 text-blue-400 p-2 rounded-lg">
          {captcha}
        </div>

        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="mt-4 w-full p-2 bg-transparent border border-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />

        <button
          onClick={verifyCaptcha}
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Verify CAPTCHA
        </button>

        <button
          onClick={generateCaptcha}
          className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Refresh CAPTCHA
        </button>
      </SpotlightCard>
    </div>
  );
};

export default CaptchaAuth;
