import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data, width, height }) => {

  const ref = useRef(null);

  useEffect(() => {
    drawChart();
  }, [data, width, height])

  const drawChart = () => {
    const svg = d3
      .select(ref.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    // translate svg
    svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const g = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d, i) => color(i));

    g.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 14)
      .attr("text-anchor", "middle")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0em")
      .text((d) => d.data.category);
  };

  return (
    <svg ref={ref} width={width} height={height} />
  );
};

export default PieChart;