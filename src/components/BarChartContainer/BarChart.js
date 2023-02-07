import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const margin = { top: 20, right: 20, bottom: 50, left: 60 };

const BarChart = ({ data, width, height }) => {
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;
  const ref = useRef(null);

  useEffect(() => {
    drawChart();
  }, [data, width, height])

  const drawChart = () => {
    const svg = d3.select(ref.current)

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    // translate svg
    const container = svg
      .append("g")
      .attr("transform", `translate(50, 0)`);

    const x = d3
      .scaleBand()
      .domain(data.map((d, i) => d.category))
      .range([0, graphWidth])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) * 1.2])
      .range([graphHeight, 0]);

    // x y axis define
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).tickFormat((d) => `${d}`);

    // x axis put into svg
    container
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${graphHeight})`)
      .append("text")
      .attr("x", width / 2)
      .attr("y", 35)
      .text("月份 ( 月 )")
      .style("text-anchor", "middle")
      .style("fill", "black");

    // y axis put into svg
    container
      .append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .text("銷量 ( 千份 )")
      .style("text-anchor", "middle")
      .style("fill", "black");

    // data fill in
    container
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("width", x.bandwidth())
      .attr("height", (d) => graphHeight - y(d.value))
      .attr("x", (d, i) => x(d.category))
      .attr("y", (d) => y(d.value))
      .style("fill", "#69b3a2");
  };

  return (
    <svg ref={ref} width={width} height={height}>
      <g />
      <g />
    </svg>
  );
};

export default BarChart;