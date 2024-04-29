import React from "react";
const PositionsTable = ({ positions }) => {
  console.log("positions", positions);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-s text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Asset</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Qty</th>
            <th className="px-6 py-3">Market Value</th>
            <th className="px-6 py-3">Total P/L($)</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, idx) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {position.symbol}
                </th>
                <td className="px-6 py-4">
                  {parseFloat(position.current_price).toFixed(2)}
                </td>
                <td className="px-6 py-4">{position.qty}</td>
                <td className="px-6 py-4">{`$${position.market_value}`}</td>
                <td className="px-6 py-4">{position.unrealized_pl}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
