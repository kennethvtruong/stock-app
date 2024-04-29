import React from "react";

const OrdersTable = ({ orders }) => {
  console.log("order", orders);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-s text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Symbol</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Qty</th>
            <th className="px-6 py-3">Average Cost</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.symbol}
                </th>
                <td className="px-6 py-4">{order.type}</td>
                <td className="px-6 py-4">{order.qty}</td>
                <td className="px-6 py-4">{`$${order.filled_avg_price}`}</td>
                <td className="px-6 py-4">
                  {parseFloat(order.qty * order.filled_avg_price)}
                </td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">{order.updated_at.split("T")[0]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
