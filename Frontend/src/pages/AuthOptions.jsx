import React from "react";
import Aurora from "../component/ui/Aurora";
import SpotlightCard from "../component/ui/SpotlightCard";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/BackButton";
import Navbar from "../component/Navbar"

const AuthOptions = () => {
  const navigate = useNavigate();
  const verificationMethods = [
    {
      title: "OTP Verification",
      desc: "Verify your identity using a One-Time Password (OTP) sent via email.",
      path: "/otp",
      status: 1,
    },
    {
      title: "Captcha Verification",
      desc: "Authenticate successfully by entering the correct captcha to proceed.",
      path: "/captcha",
      status: 1,
    },
    {
      title: "Keystroke Verification",
      desc: "Detects user identity by analyzing typing speed and patterns to prevent bots.",
      path: "/keystroke",
      status: 1,
    },
    {
      title: "Voice-Text Verification",
      desc: "Confirms identity through a secret voice message for secure access.",
      path: "/audio",
      status: 1,
    },
    {
      title: "Pattern-Based Verification",
      desc: "Confirms identity through a secret voice message for secure access.",
      path: "/pattern",
      status: 1,
    },
    {
      title: "Gesture-Based Verification",
      desc: "Confirms identity through a secret hand gesture.",
      status: 0,
    },
  ];

  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-center p-8 bg-black overflow-x-hidden md:overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-10">
        <Aurora
          colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
          blend={1}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <Navbar />
      {/* Back Button */}
      {/* <BackButton /> */}

      {/* Cards Container */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-20 md:mt-20">
        {verificationMethods.map((method, index) => (
          <SpotlightCard
            key={index}
            className="w-full md:w-80 p-6 text-white text-center"
          >
            <h2 className="text-xl font-semibold">{method.title}</h2>
            <p className="text-sm text-neutral-400 mt-2">{method.desc}</p>

            {method.status ? (
              <>
                <button
                  onClick={() => navigate(method.path)} // Navigate on click
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
                >
                  Use Now
                </button>
              </>
            ) : (
              <>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition hover:cursor-pointer">
                  In Progress
                </button>
              </>
            )}
          </SpotlightCard>
        ))}
      </div>

      {/* Extra Black Background for Overflow Prevention */}
      <div className="w-full min-h-[100px] bg-black"></div>
    </div>
  );
};

export default AuthOptions;
