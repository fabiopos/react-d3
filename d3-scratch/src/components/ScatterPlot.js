import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import ChildrenTable from "./ChildrenTable";
import ChildrenForm from "./ChildrenForm";

const margin = {
  left: 70,
  right: 10,
  bottom: 80,
  top: 10,
};
const svgProps = {
  margin,
  width: 500 - margin.left - margin.right,
  height: 300 - margin.bottom - margin.top,
  svgContainerClass: "",
};

const ScatterPlot = (props) => {
  const [data, setData] = useState([]);
  const vis = useRef();
  const svgRef = useRef();
  const { margin, height, width } = svgProps;

  const handleFormClick = (child) => {
    setData((prev) => [...prev, child]);
  };
  useEffect(() => {
    flushChart();
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(), [vis.current]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => update(), [data.length]);

  function flushChart() {
    d3.select(svgRef.current).selectAll("*").remove();
  }

  function draw() {
    const visDraw = {};
    visDraw.g = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // setting base axis
    visDraw.x = d3.scaleLinear().range([0, width]);
    visDraw.y = d3.scaleLinear().range([height, 0]);

    visDraw.xAxisGroup = visDraw.g
      .append("g")
      .attr("transform", `translate(0, ${height})`);
    visDraw.yAxisGroup = visDraw.g.append("g");

    visDraw.g
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age");

    visDraw.g
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Heigth in cm");

    vis.current = visDraw;
    //setAxis((prev) => ({ ...prev, x, y }));

    // setting vis
  }

  const getData = () => {
    d3.json("https://udemy-react-d3.firebaseio.com/children.json")
      .then((data) => setData(data))
      .then(() => update());
  };

  function update() {
    if (!vis.current) return;

    const ages = data.map((d) => Number(d.age));
    const heights = data.map((d) => Number(d.height));

    vis.current.x.domain([0, d3.max(ages)]);
    vis.current.y.domain([0, d3.max(heights)]);

    const xAxisCall = d3.axisBottom(vis.current.x);
    const yAxisCall = d3.axisLeft(vis.current.y);

    vis.current.xAxisGroup.transition(1000).call(xAxisCall);
    vis.current.yAxisGroup.transition(1000).call(yAxisCall);

    // join
    const circles = vis.current.g.selectAll("circle").data(data, (d) => d.name);

    // exit
    circles.exit().transition(1000).attr("cy", vis.current.x(0)).remove();

    // update
    circles
      .transition(100)
      .attr("cx", (d) => vis.current.x(d.age))
      .attr("cy", (d) => vis.current.y(d.height));

    // enter
    circles
      .enter()
      .append("circle")
      .attr("cy", (d) => vis.current.y(0))
      .attr("cx", (d) => vis.current.x(d.age))
      .attr("r", 5)
      .attr("fill", "gray")
      .transition(100)
      .attr("cy", (d) => vis.current.y(d.height));
  }

  return (
    <Box>
      <Heading>Scatter Plot</Heading>
      <Divider />
      <Container>
        <svg ref={svgRef}></svg>
      </Container>

      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%">
            <ChildrenForm onClick={handleFormClick} />
          </GridItem>
          <GridItem w="100%">
            <ChildrenTable data={data} />
          </GridItem>
        </Grid>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default ScatterPlot;
