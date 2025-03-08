import React, { useRef, useEffect, useState } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import similarity from 'compute-cosine-similarity';

const GestureAuth = () => {
  const webcamRef = useRef(null);
  const [storedGesture, setStoredGesture] = useState(null);
  const [isGestureSaved, setIsGestureSaved] = useState(() => !!localStorage.getItem('savedGesture'));
  const [message, setMessage] = useState(isGestureSaved ? 'Show your saved gesture to log in' : 'Show a hand gesture to save');

  useEffect(() => {
    console.log('Loading Handpose model...');
    const loadHandpose = async () => {
      await tf.setBackend('webgl');
      const net = await handpose.load();
      console.log('Handpose model loaded.');
      detectGesture(net);
    };
    loadHandpose();
  }, []);

  const detectGesture = async (net) => {
    console.log('Starting gesture detection...');
    setInterval(async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const hand = await net.estimateHands(video);
        if (hand.length > 0) {
          console.log('Hand detected:', hand);
          const landmarks = hand[0].landmarks;
          if (isGestureSaved) {
            verifyGesture(landmarks);
          } else {
            setStoredGesture(landmarks);
          }
        }
      }
    }, 1000);
  };

  const saveGesture = () => {
    if (storedGesture) {
      console.log('Saving gesture:', storedGesture);
      localStorage.setItem('savedGesture', JSON.stringify(storedGesture));
      setIsGestureSaved(true);
      setMessage('Gesture saved! Refreshing...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const verifyGesture = (gesture) => {
    const savedGesture = JSON.parse(localStorage.getItem('savedGesture'));
    if (!savedGesture) return;
    console.log('Verifying gesture...');
    
    const similarityScore = compareGestures(savedGesture, gesture);
    console.log('Similarity score:', similarityScore);
    if (similarityScore > 0.7) { // Higher value means more similarity
      console.log('Gesture matched! Redirecting...');
      setMessage('Gesture matched! Redirecting...');
      setTimeout(() => {
        window.location.href = 'https://favmedia.vercel.app/';
      }, 1000);
    }
  };

  const compareGestures = (gesture1, gesture2) => {
    console.log('Comparing gestures...');
    const flatGesture1 = gesture1.flat();
    const flatGesture2 = gesture2.flat();
    const score = similarity(flatGesture1, flatGesture2);
    console.log('Computed similarity score:', score);
    return score;
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center p-8 bg-black overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-green-400 to-purple-600 opacity-30"></div>

      {/* Gesture Authentication Card */}
      <div className="w-96 p-6 bg-white/10 backdrop-blur-md rounded-lg text-white text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <Webcam ref={webcamRef} className="rounded-lg border-2 border-gray-300" />
        {!isGestureSaved && (
          <button 
            onClick={saveGesture}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            ✋ Save Gesture
          </button>
        )}
      </div>
    </div>
  );
};

export default GestureAuth;