import React, { useState, useEffect } from 'react';
import './App.css';

import useFdc3 from './hooks';

type W = Window &
  typeof globalThis & {
    fdc3: any;
  };

function App() {
  const [counter, setCounter] = useState(0);

  const fdc3 = useFdc3();

  const handleSendClick = () => {
    fdc3?.raiseIntent('ViewContact', {
        type: 'fdc3.contact',
        id: { count: counter }
      });
    }; 

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
