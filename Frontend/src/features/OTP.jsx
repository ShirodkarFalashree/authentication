import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('OTP sent to your email.');
        setIsOtpSent(true);
      } else {
        alert('Error sending OTP.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: userOtp }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        alert('Invalid OTP! Please try again.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    }
  };

  return (
    <div>
      <h2>Email OTP Verification</h2>
      {!isOtpSent ? (
        <>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input 
            type="text" 
            placeholder="Enter OTP" 
            value={userOtp} 
            onChange={(e) => setUserOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default OTP;
