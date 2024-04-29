require("dotenv").config();
const port = 5000;
const express = require("express");
const app = express();
const cors = require("cors");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({
  keyId: process.env.PAPER_API_KEY,
  secretKey: process.env.PAPER_SECRET_KEY,
  paper: true,
});

// console.log("api_key", process.env.API_KEY);
app.use(cors());
app.use(express.json());

app.get("/getAccount", (req, res) => {
  alpaca.getAccount().then((account) => {
    res.send({
      account: account,
    });
    if (account.trading_blocked) {
      console.log("Account is currently restricted from trading.");
    }

    // Check how much money we can use to open new positions.
    // console.log(`$${account.buying_power} is available as buying power.`);
  });
});

app.get("/getDailyChange", (req, res) => {
  try {
    alpaca.getAccount().then((account) => {
      // Calculate the difference between current balance and balance at the last market close.
      const balanceChange = account.equity - account.last_equity;

      res.send({
        balanceChange: balanceChange,
      });
      console.log("Today's portfolio balance change:", balanceChange);
    });
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
});

app.get("/getPositions", (req, res) => {
  try {
    alpaca.getPositions().then((positions) => {
      res.send({
        positions: positions,
      });
      console.log("positions", positions);
      // console.log("Today's portfolio balance change:", balanceChange);
    });
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
});

app.get("/getAllOrders", (req, res) => {
  try {
    alpaca
      .getOrders({
        status: "closed",
        limit: 100,
        nested: true,
      })
      .then((orders) => {
        res.send({
          orders: orders,
        });
        console.log("orders", orders);
        // console.log("Today's portfolio balance change:", balanceChange);
      });
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
});

app.post("/createOrder", (req, res) => {
  try {
    alpaca.createOrder().then((account) => {
      // Calculate the difference between current balance and balance at the last market close.
      const balanceChange = account.equity - account.last_equity;

      res.send({
        balanceChange: balanceChange,
      });
      console.log("Today's portfolio balance change:", balanceChange);
    });
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
});
app.post("/getPortfolioHistory", (req, res) => {
  if (req.body) console.log("req.body", req.body);
  // dateStart: startDate,
  //       dateEnd: endDate,
  //       period: period,
  //       timeframe: timeframe,
  //       extendedHours: true,
  try {
    alpaca
      .getPortfolioHistory({
        // date_start: req.body.dateStart,
        // date_end: req.body.dateEnd,
        period: req.body.period,
        // timeframe: req.body.timeframe,
        extended_hours: true,
        // period: '1M' | '3M' | '6M' | '1A' | 'all' | 'intraday',
        // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D',
        // extended_hours: Boolean
      })
      .then((data) => {
        res.send({
          data: data,
        });
        console.log("data", data);
      });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
// alpaca.getAccount()
