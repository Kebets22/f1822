/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './ButtonState.css';

const ButtonState = () => {
    const [count, setCount] = useState(0);
  return (
    <div>
        <h1 className='header'>React Counter</h1>
        <p className='counter'>{count}</p>
      <button className='button' onClick={() => setCount(count + 1)}>+</button>
      <button className='button' onClick={() => setCount(count - 1)}>-</button>
      <button className='button' onClick={() => setCount(0)}>Reset</button>
      </div>
  )
}

export default ButtonState;
