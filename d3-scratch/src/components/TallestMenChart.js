import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useD3 } from "../hooks/useD3";
import { Box, Divider, Flex, Heading, Select } from "@chakra-ui/react";

const url = {
  men: "https://udemy-react-d3.firebaseio.com/tallest_men.json",
  women: "https://udemy-react-d3.firebaseio.com/tallest_women.json",
};

const chartMargin = {
  top: 10,
  bottom: 50,
  left: 70,
  right: 10,
};

const svgProps = {
  width: 500 - chartMargin.left - chartMargin.right,
  height: 500 - chartMargin.top - chartMargin.bottom,
};

const getNames = (data = []) => data.map((x) => x.name);
const getHeights = (data = []) => data.map((x) => x.height);

const TallestMenChart = (props) => {
  const svgRef = useRef();
  const [gender, setGender] = useState("men");
  const [dataset, setDataset] = useState({
    men: [],
    women: [],
  });

  const handleChange = useCallback((e) => {
    setGender(e.target.value);
  }, []);

  const update = useCallback(() => {
    const data = dataset[gender];
    console.log(dataset, gender);
    if (!svgRef.current) return;
    const maxHeight = d3.max(getHeights(data));
    const minHeight = d3.min(getHeights(data));

    const y = d3
      .scaleLinear()
      .domain([minHeight * 0.95, maxHeight])
      .range([svgProps.height, 0]);

    const x = d3
      .scaleBand()
      .domain(getNames(data))
      .range([0, svgProps.width])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);
    svgRef.current.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    svgRef.current.yAxisGroup.transition().duration(500).call(yAxisCall);

    // 1. DATA JOIN
    const rects = svgRef.current.selectAll("rect").data(data);

    // 2. EXIT
    rects
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", svgProps.height)
      .remove();

    // 3. UPDATE
    rects
      .transition()
      .duration(500)
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d, i) => svgProps.height - y(d.height));

    // 4. ENTER
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => svgProps.height)
      .attr("width", x.bandwidth)
      .attr("fill", "#0085CA")
      .attr("fill-opacity", 0)
      .transition()
      .duration(500)
      .attr("fill-opacity", 1)
      .attr("y", (d) => y(d.height))
      .attr("height", (d, i) => svgProps.height - y(d.height));

    //
  }, [dataset, gender]);

  const chartArea = useD3(
    (element) => {
      element.select("svg").remove();
      const svg = element
        .append("svg")
        .attr("width", svgProps.width + chartMargin.left + chartMargin.right)
        .attr("height", svgProps.height + chartMargin.top + chartMargin.bottom)
        .append("g")
        .attr(
          "transform",
          `translate(${chartMargin.left}, ${chartMargin.top})`
        );

      svg
        .append("text")
        .attr("x", svgProps.width / 2)
        .attr("y", svgProps.height + 50)
        .attr("text-anchor", "middle")
        .text("Persons");

      svg
        .append("text")
        .attr("x", -(svgProps.height / 2))
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Heigth in cm");

      // axis generator

      svg.xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0, ${svgProps.height})`);

      svg.yAxisGroup = svg.append("g");

      svgRef.current = svg;
    },
    [gender]
  );

  useEffect(() => {
    Promise.all([d3.json(url.men), d3.json(url.women)]).then(
      ([mends, womends]) => {
        setDataset({
          men: mends,
          women: womends,
        });
      }
    );

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    update();
    let timer = d3.interval(() => {
      update();
    }, 1000);

    return () => {
      timer?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, update]);

  return (
    <Box>
      <Heading style={{ paddingLeft: 10 }}>
        Tallest {gender === "men" ? "Men" : "Women"} Chart
      </Heading>
      <Divider />
      <Flex p="5">
        <Box>
          <Select onChange={handleChange} defaultValue={gender}>
            <option value="women">Women</option>
            <option value="men">Men</option>
          </Select>
        </Box>
        <Box>
          <div className="chart-area" ref={chartArea}></div>
        </Box>
      </Flex>
    </Box>
  );
};

TallestMenChart.propTypes = {};

export default TallestMenChart;
