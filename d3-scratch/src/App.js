// import BarChartExample from "./components/BarChartExample";
import TallestMenChart from "./components/TallestMenChart";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        {/* <BarChartExample /> */}
        <TallestMenChart />
      </div>
    </ChakraProvider>
  );
}

export default App;
