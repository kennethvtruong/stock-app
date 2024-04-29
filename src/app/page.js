"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import {
  getAccount,
  getDailyChange,
  getAllOrders,
  getPositions,
  getPortfolioHistory,
} from "./api/api";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [account, setAccount] = useState({
    // id,
    // admin_configurations,
    // user_configurations,
    // account_number,
    // status,
    // crypto_status,
    // currency,
    // buying_power,
    // regt_buying_power,
    // daytrading_buying_power,
    // effective_buying_power,
    // non_marginable_buying_power,
    // bod_dtbp,
    // cash,
    // accrued_fees,
    // pending_transfer_in,
    // portfolio_value,
    // pattern_day_trader,
    // trading_blocked,
    // transfers_blocked,
    // account_blocked,
    // created_at,
    // trade_suspended_by_user,
    // multiplier,
    // shorting_enabled,
    // equity,
    // last_equity,
    // long_market_value,
    // short_market_value,
    // position_market_value,
    // initial_margin,
    // maintenance_margin,
    // last_maintenance_margin,
    // sma,
    // daytrade_count,
    // balance_asof,
    // crypto_tier,
  });
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [portfolioParams, setPortfolioParams] = useState({
    // dateStart: new Date().toISOString().split("T")[0],
    // dateEnd: new Date().toISOString().split("T")[0],
    period: "intraday",
    // timeframe: "1Min",
    extendedHours: true,
  });
  const [portfolioData, setPortfolioData] = useState([]);
  const fetchAccount = async () => {
    try {
      const data = await getAccount();
      console.log("data", data);
      setAccount((acc) => (acc = data?.account));
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const data = await getAllOrders();
      console.log("data", data);
      // setAccount((acc) => (acc = data?.account));
      setOrders((orderList) => (orderList = [...data.orders]));
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchPositions = async () => {
    try {
      const data = await getPositions();
      console.log("data", data);
      // setAccount((acc) => (acc = data?.account));
      setPositions((posList) => (posList = [...data.positions]));
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchDailyChange = async () => {
    try {
      const data = await getDailyChange();
      console.log("data", data);
      // setAccount((acc) => (acc = data?.account));
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    const currTime = new Date();
    // const nextMin = (60 - currTime.getSeconds()) * 1000;
    const nextMin = 15000;
    fetchAccount();
    fetchPositions();
    fetchPortfolioHistory(portfolioParams);
    const interval = setInterval(() => {
      fetchAccount();
      fetchPositions();
      fetchPortfolioHistory(portfolioParams);
      // const nextMin = 60000;
    }, nextMin);
    // setInterval(fetchAccount, 60000);
    return () => clearInterval(interval);
  }, [portfolioParams]);

  useEffect(() => {
    fetchAllOrders();
    // fetchPositions();
  }, [portfolioParams]);

  const updatePortfolioData = (newData) => {
    setPortfolioData((prevDataArray) => [...prevDataArray, ...newData]);
  };

  const fetchPortfolioHistory = async () => {
    try {
      const data = await getPortfolioHistory(portfolioParams);
      console.log("portfolio", data.data);
      const dataArr = [];
      for (let i = 0; i < data?.data.equity.length; i++) {
        dataArr.push({
          equity: data.data.equity[i],
          profit_loss: data.data.profit_loss[i],
          timestamp: new Date(data.data.timestamp[i] * 1000),
        });
      }
      console.log("dataArr", dataArr);
      setPortfolioData((oldData) => (oldData = [...dataArr]));
      // setAccount((acc) => (acc = data?.account));
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchPortfolioHistory(portfolioParams);
  }, [portfolioParams]);

  // console.log("account", account);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* {account ? account.buying_power : ""} */}
        {/* {account} */}
        <Dashboard
          account={account}
          orders={orders}
          positions={positions}
          portfolioParams={portfolioParams}
          setPortfolioParams={setPortfolioParams}
          portfolioData={portfolioData}
          // setPortfolioData={setPortfolioData}
        />
      </div>
    </main>
  );
}
