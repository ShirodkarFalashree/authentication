import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Audio = () => {
  const [secretMessage, setSecretMessage] = useState('');
  const [spokenMessage, setSpokenMessage] = useState('');
  const navigate = useNavigate();

  const startRecording = (setMessage) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      alert('Speech recognition error: ' + event.error);
    };
  };

  const verifySpeech = () => {
    if (spokenMessage.toLowerCase() === secretMessage.toLowerCase()) {
      navigate('/');
    } else {
      alert('Spoken message does not match the secret message!');
    }
  };

  return (
    <div>
      <h3>Register Secret Message</h3>
      <button className='border p-3'  onClick={() => startRecording(setSecretMessage)}>Record Secret Message</button>
      <p>Stored Message: {secretMessage}</p>

      <h3>Verify with Speech</h3>
      <button className='border p-3' onClick={() => startRecording(setSpokenMessage)}>Speak Now</button>
      <p>Spoken Message: {spokenMessage}</p>
      <button onClick={verifySpeech}>Verify Speech</button>
    </div>
  );
};

export default Audio;
