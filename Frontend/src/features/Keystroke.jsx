import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Keystroke = () => {
  const [keystrokes, setKeystrokes] = useState([]);
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    const timestamp = Date.now();
    setKeystrokes(prev => [...prev, { key: event.key, timestamp }]);
  };

  const analyzeKeystrokes = () => {
    if (keystrokes.length > 5) {
      const intervals = keystrokes.map((k, i) => 
        i > 0 ? k.timestamp - keystrokes[i - 1].timestamp : null
      ).filter(Boolean);
  
      const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  
      console.log("Keystroke Intervals:", intervals);
      console.log("Average Interval:", averageInterval);
  
      if (averageInterval > 50 && averageInterval < 500) { 
        navigate('/'); 
      } else { 
        alert('Typing pattern does not match human behavior'); 
      }
    } else {
      alert('Keystroke pattern not sufficient to verify human identity');
    }
  };
  

  return (
    <div>
      <h2>Keystroke Dynamics Authentication</h2>
      <input 
        type="text" 
        placeholder="Type here..." 
        onKeyDown={handleKeyDown} 
      />
      <button onClick={analyzeKeystrokes}>Submit</button>
      {/* <pre>{JSON.stringify(keystrokes, null, 2)}</pre> */}
    </div>
  );
};

export default Keystroke;
