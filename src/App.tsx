import React, { useState, useEffect } from 'react';
import './App.css';

import useFdc3 from './hooks';

type W = Window &
  typeof globalThis & {
    fdc3: any;
  };

function App() {
  const [counter, setCounter] = useState(0);
  const [channel, setChannel] = useState<any>();

  const fdc3 = useFdc3();

  useEffect(() => {
    fdc3?.getOrCreateChannel('myChannel').then((fdc3Channel: any) => {
      setChannel(fdc3Channel);
    })
  },[fdc3])

  useEffect(() => {
    if (channel) {
      const listener = channel.addContextListener('mars', (context: any) => {
        console.log('context', context);
        setCounter(context.id.count);
      });

      return () => listener.unsubscribe();
    }
  },[channel])

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
      <h1>earth</h1>
      <p>counter value: {counter}</p>
      <button onClick={handleCounterClick}>increase</button>
      <button onClick={handleSendClick}>send</button>
    </div>
  );
}

export default App;
