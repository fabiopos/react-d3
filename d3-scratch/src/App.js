import "./App.css";
import ChartWrapper from "./components/ChartWrapper";

function App() {
  return (
    <div className="App">
      <ChartWrapper />
      <svg width={600} height={100}>
        <rect x={0} y={50} width={50} height={50} fill="green"></rect>
        <circle cx={90} cy={75} r={25} fill={"red"}></circle>
        <ellipse cx={150} cy={75} rx={15} ry={25} fill={"gray"}></ellipse>
        <line x1={175} x2={195} y1={75} y2={95} stroke="blue" strokeWidth={5} />
        <text x={215} y={75} fill="orange">
          Hello world
        </text>
      </svg>
    </div>
  );
}

export default App;
