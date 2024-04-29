import React, { useState, useRef } from "react";
import PositionsTable from "./PositionsTable";
import OrdersTable from "./OrdersTable";
import Portfolio from "./Portfolio";
import LineGraph from "./LineGraph";

const Dashboard = ({
  account,
  orders,
  positions,
  portfolioParams,
  setPortfolioParams,
  portfolioData,
}) => {
  return (
    <div className="dashboard-container w-full">
      <div className="mx-auto w-full flex-1 space-y-8 p-8 pt-0 xs:pl-0 md:p-8 md:pt-0 md:pl-0">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-4/7 w-full lg:w-2/3 mb-4 lg:mb-0 space-y-6">
            <div
              className="space-y-6 p-6 rounded-lg border border-gray-200 bg-slate-600 w-full"
              id="portfolio-container"
            >
              Portfolio
              <Portfolio
                portfolioParams={portfolioParams}
                setPortfolioParams={setPortfolioParams}
                portfolioData={portfolioData}
              />
              {/* <div></div> */}
              {/* <LineGraph
                portfolioData={portfolioData}
                width={500}
                height={500}
              /> */}
            </div>
            <div className="space-y-6 p-6 rounded-lg border border-gray-200 bg-slate-600">
              <div className="flex flex-wrap">
                <div className="flex w-full justify-between border-b p-4 pl-0 md:block md:w-1/4 md:border-b-0">
                  <div className="text-lg font-medium">Buying Power</div>
                  <div className="md:mt-6 text-lg">
                    {account?.buying_power ? `$${account.buying_power}` : ""}
                  </div>
                </div>
                <div className="flex w-full justify-between border-b p-4 pl-0 md:block md:w-1/4 md:border-b-0">
                  <div className="text-lg font-medium">Cash</div>
                  <div className="md:mt-6 text-lg">
                    {account?.cash ? `$${account.cash}` : ""}
                  </div>
                </div>
                <div className="flex w-full justify-between border-b p-4 pl-0 md:block md:w-1/4 md:border-b-0">
                  <div className="text-lg font-medium">Daily Change</div>
                  <div className="md:mt-6 text-lg">
                    {account?.equity
                      ? `$${parseFloat(
                          account.equity - account.last_equity
                        ).toFixed(2)}`
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 p-6 rounded-lg border border-gray-200 bg-slate-600">
              <PositionsTable positions={positions} />
              {/* {positions
                ? positions.map((position) => {
                    console.log("order", position);
                    return <div>{position.symbol}</div>;
                  })
                : ""} */}
            </div>
            <div className="space-y-6 p-6 rounded-lg border border-gray-200 bg-slate-600">
              <OrdersTable orders={orders} />
              {/* {orders
                ? orders.map((order) => {
                    console.log("order", order);
                    return <div>{JSON.stringify(order)}</div>;
                  })
                : ""} */}
            </div>
          </div>
          <div className="lg:w-3/7 flex w-full flex-col lg:w-1/3 lg:pl-6 space-y-6">
            <div className="space-y-6 p-6 rounded-lg border border-gray-200 bg-white">
              <div class="text-sm font-medium text-center text-green-500 border-b border-gray-200 dark:text-green-600 dark:border-green-700">
                <ul class="flex flex-wrap -mb-px justify-center">
                  <li class="me-2">
                    <a
                      href="#"
                      class="inline-block p-4 border-b-10 border-transparent rounded-t-lg hover:text-gray-600 hover:border-green-300 dark:hover:text-green-300"
                    >
                      Buy
                    </a>
                  </li>
                  <li class="me-2">
                    <a
                      href="#"
                      class="inline-block p-4 text-red-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-red-500 dark:border-red-500 hover:border-red-300 dark:hover:text-red-300"
                      aria-current="page"
                    >
                      Sell
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
