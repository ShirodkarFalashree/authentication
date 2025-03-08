import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../component/ui/SpotlightCard";
import Aurora from "../component/ui/Aurora";

const Audio = () => {
  const [secretMessage, setSecretMessage] = useState(
    localStorage.getItem("secretMessage") || ""
  );
  const [spokenMessage, setSpokenMessage] = useState("");
  const [isRecordingSecret, setIsRecordingSecret] = useState(!secretMessage);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!secretMessage && !hasWelcomed) {
      alert("Welcome! Please record a secret message to continue.");
      setHasWelcomed(true);
    }
  }, [secretMessage, hasWelcomed]);

  const startRecording = (setMessage, callback = null) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in your browser. Please use Google Chrome."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onstart = () => {
        console.log("Voice recording started...");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        if (callback) callback(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("Speech recognition error: " + event.error);
      };
    } catch (error) {
      console.error("Error initializing Speech Recognition:", error);
      alert("Failed to start speech recognition. Try again.");
    }
  };

  const saveSecretMessage = (message) => {
    setSecretMessage(message);
    localStorage.setItem("secretMessage", message);
    alert("Secret message saved successfully! Refreshing...");
    window.location.reload();
  };

  const verifySpeech = () => {
    if (spokenMessage.toLowerCase() === secretMessage.toLowerCase()) {
      alert("Verification successful! Redirecting...");
      window.location.href = "https://favmedia.vercel.app/";
    } else {
      alert("Incorrect speech! Please try again.");
    }
  };

  const resetSecretMessage = () => {
    startRecording(setSpokenMessage, (transcript) => {
      if (transcript.toLowerCase() === secretMessage.toLowerCase()) {
        localStorage.removeItem("secretMessage");
        setSecretMessage("");
        alert("Secret message reset. Refreshing...");
        window.location.reload();
      } else {
        alert("Incorrect secret message! Reset failed.");
      }
    });
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center p-8 bg-black overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
          blend={1}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Audio Verification Card */}
      <SpotlightCard className="w-96 p-6 text-white text-center">
        {isRecordingSecret ? (
          <>
            <h2 className="text-xl font-semibold">
              🔒 Set Your Secret Message
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Speak a message that only you know. This will be used for
              verification.
            </p>
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() =>
                startRecording(setSecretMessage, saveSecretMessage)
              }
            >
              🎤 Record Secret Message
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">🎤 Speak to Verify</h2>
            <p className="text-sm text-neutral-400 mt-2">
              Say your secret message aloud to continue.
            </p>
            <button
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => startRecording(setSpokenMessage)}
            >
              🔊 Speak Now
            </button>
            <p className="text-neutral-400 mt-4">
              Spoken Message:{" "}
              <span className="font-semibold">{spokenMessage}</span>
            </p>
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={verifySpeech}
            >
              ✅ Verify Speech
            </button>

            <h3 className="text-lg font-semibold text-white mt-6">
              🔄 Reset Secret Message
            </h3>
            <p className="text-sm text-neutral-400">
              You must say the current message correctly to reset.
            </p>
            <button
              className="mt-2 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={resetSecretMessage}
            >
              🔁 Reset Secret Message
            </button>
          </>
        )}
      </SpotlightCard>
    </div>
  );
};

export default Audio;
