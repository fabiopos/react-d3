// import BarChartExample from "./components/BarChartExample";
// import TallestMenChart from "./components/TallestMenChart";
import { ChakraProvider } from "@chakra-ui/react";
import ScatterPlot from "./components/ScatterPlot";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        {/* <BarChartExample /> */}
        {/* <TallestMenChart /> */}
        <ScatterPlot />
      </div>
    </ChakraProvider>
  );
}

export default App;
