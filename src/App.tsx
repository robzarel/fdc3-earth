import React, { useState, useEffect } from 'react';
import './App.css';
type W = Window &
  typeof globalThis & {
    fdc3: any;
  };

function App() {
  const [counter, setCounter] = useState(0);
  const [isFdc3Availiable, setFdc3Availabillity] = useState(false);

  useEffect(()=> {
    const startFdc3 = () => {
      setFdc3Availabillity(true);
    }
    
    if ((window as W).fdc3) {
      startFdc3();
    } else {
      window.addEventListener('fdc3Ready', startFdc3);
    }
    
    return () => {
      window.removeEventListener('fdc3Ready', startFdc3);
    }
  }, []);

  const handleSendClick = () => {
    if (isFdc3Availiable) {
      (window as W).fdc3.raiseIntent('ViewContact', {
        type: 'fdc3.contact',
        id: { count: counter }
      });
    }; 
  }

  const handleCounterClick = () => {
    setCounter((prev) => prev+1)
  }

  return (
    <div className="App">
      <p>counter value: {counter}</p>
      <button onClick={handleCounterClick}>increase</button>
      <button onClick={handleSendClick}>send</button>
    </div>
  );
}

export default App;
