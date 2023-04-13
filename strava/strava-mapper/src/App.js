import './App.css';
import * as d3 from 'd3'
import USAMap from "react-usa-map";


function App() {
  d3.selectAll("div").style("color", "blue")
  return (
    <div className="App">
      <USAMap onClick={() => console.log("hello world")} />
    </div>
  );
}

export default App;
