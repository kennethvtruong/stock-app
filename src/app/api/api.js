export const getAccount = () => {
  return fetch("http://localhost:5000/getAccount")
    .then((res) => res.json())
    .then((data) => {
      // Handle the received data
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle fetch errors here
      console.error("Fetch error:", error);
      throw error;
    });
};

export const getDailyChange = async () => {
  return fetch("http://localhost:5000/getDailyChange")
    .then((res) => res.json())
    .then((data) => {
      // Handle the received data
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle fetch errors here
      console.error("Fetch error:", error);
    });
};

export const getAllOrders = async () => {
  return fetch("http://localhost:5000/getAllOrders")
    .then((res) => res.json())
    .then((data) => {
      // Handle the received data
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle fetch errors here
      console.error("Fetch error:", error);
    });
};

export const getPositions = async () => {
  return fetch("http://localhost:5000/getPositions")
    .then((res) => res.json())
    .then((data) => {
      // Handle the received data
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle fetch errors here
      console.error("Fetch error:", error);
    });
};

export const getPortfolioHistory = async (parameters) => {
  return fetch("http://localhost:5000/getPortfolioHistory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parameters),
  })
    .then((res) => res.json())
    .then((data) => {
      // Handle the received data
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle fetch errors here
      console.error("Fetch error:", error);
    });
};
