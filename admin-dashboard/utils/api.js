const axios = require("axios");

module.exports = (token) => {
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
