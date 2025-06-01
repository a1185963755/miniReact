/*
 * @description: 
 * @param: 
 * @return: 
 * @Date: 2025-05-27 21:42:39
 */
// import App from './App.jsx'
import { createRoot } from './lib/react-dom/ReactDOM.js'
const root=createRoot(document.getElementById('root'))
root.render(<div id="oDiv" className="test" onChange={() => { console.log('change') }}>
  <ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>西瓜</li>
  </ul>
  1111
</div>)
