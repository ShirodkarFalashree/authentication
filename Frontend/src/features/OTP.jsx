import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../component/ui/SpotlightCard";
import Aurora from "../component/ui/Aurora";

const OTP = () => {
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP sent to your email.");
        setIsOtpSent(true);
      } else {
        alert("Error sending OTP.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: userOtp }),
      });

      if (response.ok) {
        window.location.href = "https://to-desktop-frontend-clone.vercel.app/";
      } else {
        alert("Invalid OTP! Please try again.");
      }
    } catch (error) {
      alert("Error connecting to server.");
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

      {/* OTP Card */}
      <SpotlightCard className="w-96 p-6 text-white text-center">
        <h2 className="text-xl font-semibold">Email OTP Verification</h2>

        {!isOtpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-4 w-full p-2 bg-transparent border border-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendOtp}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              className="mt-4 w-full p-2 bg-transparent border border-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={verifyOtp}
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
          </>
        )}
      </SpotlightCard>
    </div>
  );
};

export default OTP;
