import React from "react";
import * as d3 from "d3";

import { useD3 } from "../hooks/useD3";
import { Box, Button, Container, Heading } from "@chakra-ui/react";

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

const svgProps = {
  width: 500,
  height: 500,
};

const TallestMenChart = (props) => {
  const chartArea = useD3((element) => {
    element.select("svg").remove();
    const svg = element
      .append("svg")
      .attr("width", svgProps.width)
      .attr("height", svgProps.height);

    d3.json(url).then((tallestMenData) => {
      const names = tallestMenData.map((x) => x.name);
      const heights = tallestMenData.map((x) => x.height);

      const maxHeight = d3.max(heights);
      const y = d3
        .scaleLinear()
        .domain([0, maxHeight])
        .range([0, svgProps.height]);

      const x = d3
        .scaleBand()
        .domain(names)
        .range([0, svgProps.width])
        .padding(0.4);
      const rects = svg.selectAll("rect").data(tallestMenData);

      // axis generator

      rects
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => {
          // console.log(svgProps.height - y(d.height));
          return svgProps.height - y(d.height);
        })
        .attr("width", x.bandwidth)
        .attr("height", (d, i) => y(d.height))
        .attr("fill", (d) => {
          if (d.height < 272) return "red";
          return "green";
        });
    });
  }, []);

  return (
    <Box>
      <Heading style={{ paddingLeft: 10 }}>Tallest Men Chart</Heading>
      <Container>
        <div className="chart-area" ref={chartArea}></div>
      </Container>
    </Box>
  );
};

TallestMenChart.propTypes = {};

export default TallestMenChart;
