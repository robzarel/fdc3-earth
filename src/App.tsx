import React, { useState, useEffect, useCallback } from 'react';
import Styles from './App.module.css';

import useFdc3 from './hooks';
import getUsers from './data';
import type { USER } from './data';

const USERS = getUsers(100);
function App() {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState<USER[]>(USERS);
  const [channel, setChannel] = useState<any>();

  const fdc3 = useFdc3();

  const handleClick = useCallback((userId: string) => () => {
    setUsers((prev) => {      
      const updated = [...prev];
      const index = prev.findIndex((user) => user.userId === userId);
      updated[index].isFavorite = !prev[index].isFavorite;      

      channel?.broadcast({
        type: 'favorite',
        id: { users: updated.filter((user) => user.isFavorite === true) }
      });

      return updated;
    });
  }, [channel])

  useEffect(() => {
    fdc3?.getOrCreateChannel('myChannel').then((fdc3Channel: any) => {
      setChannel(fdc3Channel);
    })
  },[fdc3])

  useEffect(() => {
    const counterListener = channel?.addContextListener('counter', (context: any) => {
      setCounter(context.id.count);
    });

    return () => {
      counterListener?.unsubscribe();
    }
  },[channel, handleClick]);

  const handleSendClick = () => {
    channel.broadcast({
      type: 'counter',
      id: { count: counter }
    });
  };

  const handleCounterClick = () => {
    setCounter((prev) => prev+1);
  }

  return (
    <div className={Styles.App}>
      <h1>earth</h1>
      <p>counter value: {counter}</p>
      <button onClick={handleCounterClick}>increase</button>
      <button onClick={handleSendClick}>send</button>

      <ul className={Styles.list}>
        {users.map((user) => {
          return (
            <li key={user.userId} className={Styles.listItem}>
              <img className={Styles.avatar} src={user.avatar} alt="" />
              <div className={Styles.info}>
                <p className={Styles.username}>name: {user.username}</p>
                <p className={Styles.email}>email: {user.email}</p>
                <button className={Styles.button} onClick={handleClick(user.userId)}>{`${user.isFavorite ? 'remove from': 'add to'}`} favorit</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
