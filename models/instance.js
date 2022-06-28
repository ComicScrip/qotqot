const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: process.env.AIRTABLE_API,
  headers: {
    Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
  },
});

export default instance;
