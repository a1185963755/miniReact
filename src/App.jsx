import React from "./lib/react/React";


// function App({id}) {

//   return (
//     <div id={id} >
//       <h1>Vite + React</h1>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container" id={this.props.id}>
        <div className="one">
          <div className="two">
            <p>1111</p>
            <p>2222</p>
          </div>
          <div className="three">
            <p>3333</p>
            <p>4444</p>
          </div>
        </div>
        <p>this is a test!!!</p>
      </div>
    );
  }
}

export default App
