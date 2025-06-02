/*
 * @description: 
 * @param: 
 * @return: 
 * @Date: 2025-05-27 21:42:39
 */
import React from "./lib/react/React";
import { useState } from "./lib/react/ReactHooks";


function App({ id }) {
  // 定义一个状态 count，以及修改状态的方法 setCount
  const [count, setCount] = useState(3);

  const handleDecrement = () => {
    setCount(count- 1);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div className="container" id={id}>
      <div className="one">
        <div className="two">
          <p>1</p>
          <p>2</p>
        </div>
        <div className="three">
          <p>3</p>
          <p>4</p>
        </div>
      </div>
      <p>this is a tes1</p>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span>{count}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}

export default App
