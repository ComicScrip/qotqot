require("dotenv").config();
const axios = require("axios");
const { hashPassword } = require("./models/user");

(async function main() {
  axios.post(
    `${process.env.AIRTABLE_API}/users`,
    {
      records: [
        {
          fields: {
            Email: "test@gmail.com",
            MDP: await hashPassword("qotqot1000"),
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    }
  );
})();
