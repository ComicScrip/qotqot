const argon2 = require("argon2");
const { default: axios } = require("axios");

module.exports.findUserByEmail = (email) => {
  return axios
    .get(
      `${
        process.env.AIRTABLE_API
      }/users?filterByFormula=%7BEmail%7D%3D%22${encodeURIComponent(email)}%22`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then(({ data }) => {
      return data;
    });
};

module.exports.getSafeAttributes = (user) => user;

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2.argon2id,
};

module.exports.verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

const hashPassword = (plainPassword) =>
  argon2.hash(plainPassword, hashingOptions);

// // module.exports.deleteAllUsers = db.user.deleteMany;

// // module.exports.deleteUserByEmail = (email) =>
// //   db.user.delete({ where: { email } }).catch(() => false);

module.exports.hashPassword = hashPassword;

// module.exports.getSafeAttributes = (user) => ({
//   ...user,
//   hashedPassword: undefined,
// });
