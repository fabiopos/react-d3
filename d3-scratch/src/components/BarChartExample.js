import React from "react";
import * as d3 from "d3";
import { useD3 } from "../hooks/useD3";

const url = "https://udemy-react-d3.firebaseio.com/ages.json";

const BarChartExample = ({ gender }) => {
  const chartArea = useD3((element) => {
    element.select("svg").remove();
    const svg = element.append("svg").attr("width", 500).attr("height", 500);

    d3.json(url).then((agesData) => {
      const rects = svg.selectAll("rect").data(agesData);
      rects
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100)
        .attr("y", 150)
        .attr("width", 50)
        .attr("height", (d, i) => d.age * 10)
        .attr("fill", (d) => {
          if (d.age > 10) return "red";
          return "green";
        });
    });
  }, []);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default BarChartExample;
