import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptchaAuth = () => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  // Function to generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
      setIsVerified(true);
      navigate("/");
    } else {
      alert("Captcha incorrect! Try again.");
      setUserInput("");
      generateCaptcha(); // Generate a new captcha if incorrect
    }
  };

  return (
    <div>
      <h2>Custom CAPTCHA Authentication</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "3px" }}>
        {captcha}
      </p>
      <input
        type="text"
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={verifyCaptcha}>Verify</button>
      <button onClick={generateCaptcha} style={{ marginLeft: "10px" }}>
        Refresh CAPTCHA
      </button>
    </div>
  );
};

export default CaptchaAuth;
