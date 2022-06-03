const { createUser } = require("../models/user");

async function seed() {
  await createUser({
    email: "dave.lopper@gmail.com",
    password: "superpassword",
  });
}

seed();

module.exports = seed;
