import React, { useState, useEffect, useRef } from "react";
import LineGraph from "./LineGraph";
import * as d3 from "d3";
const Portfolio = ({ portfolioParams, setPortfolioParams, portfolioData }) => {
  //   console.log("positions", positions);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const periodOptions = ["intraday", "1M", "3M", "6M", "1A", "all"];
  const timeframeOptions = ["1Min", "5Min", "15Min", "1H", "1D"];
  const startRef = useRef(null);
  const endRef = useRef(null);
  // const periodRef = useRef(null);
  const timeframeRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    // const startDate = startRef.current?.value;
    // const endDate = endRef.current?.value;
    const period = periodRef.current?.value;
    // const timeframe = timeframeRef.current?.value;
    setPortfolioParams({
      // dateStart: startDate,
      // dateEnd: endDate,
      period: period,
      // timeframe: timeframe,
      extendedHours: true,
    });

    // if (startDate && endDate && startDate >= endDate) {
    //   setError(true);
    // } else {
    //   setError(false);
    //   //   console.log("submitted form", startDate, endDate);

    // }
  };

  //   const divElement = document.getElementById("portfolio-container");
  //   console.log("divEle", divElement.offsetWidth);
  //   const widthOfContainer = divElement.offsetWidth;
  //   console.log("hoveredPoint", hoveredPoint);
  //   console.log("portfolioData", portfolioData);

  return (
    <div className="relative overflow-x-auto">
      {/* <form onSubmit={handleSubmit} className="flex flex-row"> */}
      {/* <div>
          <input
            className="bg-slate-600"
            style={error ? { color: "red" } : {}}
            type="date"
            id="start-date"
            ref={startRef}
            defaultValue={
              new Date(new Date().getDate() - 1).toISOString().split("T")[0]
            }
          />
          -
          <input
            className="bg-slate-600"
            style={error ? { color: "red" } : {}}
            type="date"
            id="end-date"
            ref={endRef}
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div> */}
      <div className="flex flex-row">
        <label>Period</label>
        <select
          // ref={periodRef}
          className="bg-inherit text-slate-300"
          onChange={(e) => {
            console.log(e);
            setPortfolioParams({ ...portfolioParams, period: e.target.value });
          }}
        >
          {periodOptions.map((el, idx) => {
            return (
              <option value={el} key={idx} className="bg-slate-600">
                {el}
              </option>
            );
          })}
        </select>
      </div>
      {/* <div className="form-item">
          <label>TimeFrame </label>
          <select ref={timeframeRef} className="bg-inherit text-slate-300">
            {timeframeOptions.map((el, idx) => {
              return (
                <option value={el} key={idx} className="bg-slate-600">
                  {el}
                </option>
              );
            })}
          </select>
        </div> */}
      {/* <div className="form-item">
          <button type="submit" className="bg-slate-600 text-slate-300">
            Submit
          </button>
        </div> */}
      {/* </form> */}
      <div>
        {/* <LineGraph
          portfolioData={portfolioData}
          height={400}
          width={400}
          hoveredPoint={hoveredPoint}
          setHoveredPoint={setHoveredPoint}
        /> */}
        {portfolioData.length ? (
          <div>
            <div>
              <p>
                Value:
                {`$${
                  hoveredPoint
                    ? hoveredPoint.equity
                    : portfolioData[portfolioData.length - 1].equity
                }`}
              </p>
              <p>
                Time:
                {` ${d3.timeFormat("%b %d, %Y %I:%M %p")(
                  hoveredPoint
                    ? hoveredPoint.timestamp
                    : portfolioData[portfolioData.length - 1].timestamp
                )}`}
              </p>
            </div>
            <div className="graph-container">
              <LineGraph
                portfolioData={portfolioData}
                height={400}
                // width={document.querySelector(".graph-container").clientWidth}
                className="w-full"
                hoveredPoint={hoveredPoint}
                setHoveredPoint={setHoveredPoint}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Portfolio;
