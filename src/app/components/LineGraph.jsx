import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const LineGraph = ({
  portfolioData,
  width,
  height,
  hoveredPoint,
  setHoveredPoint,
}) => {
  const svgRef = useRef();
  //   const [hoveredPoint, setHoveredPoint] = useState(null);
  const [xScale, setXScale] = useState(null);
  const [yScale, setYScale] = useState(null);

  useEffect(() => {
    if (!portfolioData || !portfolioData.length) return;

    const svg = d3.select(svgRef.current);

    // Parse timestamp values
    // portfolioData.forEach((d) => {
    //   d.timestamp = new Date(d.timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    // });
    const sameDay = portfolioData.every(
      (d) => d.timestamp.getDate() === portfolioData[0].timestamp.getDate()
    );
    // Find min and max values for x-axis and y-axis
    const minX = d3.min(portfolioData, (d) => d.timestamp);
    const maxX = d3.max(portfolioData, (d) => d.timestamp);
    const minY = d3.min(portfolioData, (d) => d.equity); // Adjust minY
    const maxY = d3.max(portfolioData, (d) => d.equity);

    // Define x and y scales
    const xScale = d3
      .scaleTime()
      .domain([minX, maxX])
      .range([40, svgRef.current.clientWidth - 60]);

    const yScale = d3
      .scaleLinear()
      .domain([minY, maxY])
      .range([height - 20, 20]);

    setXScale(() => xScale);
    setYScale(() => yScale);

    // Define line generator
    const line = d3
      .line()
      .x((d) => xScale(d.timestamp))
      .y((d) => yScale(d.equity));

    // Draw line path
    svg
      .select(".line-path")
      .datum(portfolioData)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue");

    // Add circles for each data point
    // svg
    //   .selectAll(".data-point")
    //   .data(portfolioData)
    //   .enter()
    //   .append("circle")
    //   .attr("class", "data-point")
    //   .attr("cx", (d) => xScale(d.timestamp))
    //   .attr("cy", (d) => yScale(d.equity))
    //   .attr("r", 5)
    //   .attr("fill", "steelblue")
    //   .on("mouseover", (event, d) => {
    //     setHoveredPoint(d);
    //   })
    //   .on("mouseout", () => {
    //     setHoveredPoint(null);
    //   });

    // Draw x-axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(sameDay ? d3.timeFormat("%I %p") : d3.timeFormat("%b %d"));

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height - 20})`)
      .call(xAxis);

    // Draw y-axis
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.select(".y-axis").attr("transform", "translate(40, 0)").call(yAxis);
  }, [portfolioData, height]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      //   className="w-full"
      height={400}
      onMouseMove={(event) => {
        const { clientX } = event;
        if (!xScale) return;

        // const divElement =

        // console.log("widthContainer", widthOfContainer);
        // const timestamp = xScale.invert(clientX - 155); // Subtract left margin
        const timestamp = xScale.invert(
          //   (clientX - 40) * (clientX / window.innerWidth)
          clientX - svgRef.current.getBoundingClientRect().left
        );
        const bisectDate = d3.bisector((d) => d.timestamp).left;
        const index = bisectDate(portfolioData, timestamp, 1);
        const leftData = portfolioData[index - 1];
        const rightData = portfolioData[index];
        const closestDataPoint =
          !rightData ||
          timestamp - leftData.timestamp < rightData.timestamp - timestamp
            ? leftData
            : rightData;
        setHoveredPoint(closestDataPoint);
      }}
      onMouseLeave={() =>
        // setHoveredPoint(portfolioData[portfolioData.length - 1])
        setHoveredPoint(null)
      }
    >
      <g className="line-graph" transform="translate(40, 0)">
        <g className="x-axis" />
        <g className="y-axis" />
        {hoveredPoint && (
          <g className="hovered-point">
            <circle
              cx={xScale(hoveredPoint.timestamp)}
              cy={yScale(hoveredPoint.equity)}
              r={5}
              fill="bg-gray-500"
            />
            {/* <text
              x={xScale(hoveredPoint.timestamp) + 10}
              y={yScale(hoveredPoint.equity) - 10}
            >
              {`${hoveredPoint.equity},${hoveredPoint.timestamp}`}
            </text> */}
          </g>
        )}
        <path className="line-path" fill="none" stroke="steelblue" />
      </g>
    </svg>
  );
};

export default LineGraph;
