const argon2 = require("argon2");
const { default: axios } = require("axios");

module.exports.findUserByEmail = async (email) => {
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
      return data?.records?.[0];
    });
};

module.exports.getSafeAttributes = (user) => user;

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2.argon2id,
};

const verifyPassword = (plainPassword, hashedPassword) =>
  argon2.verify(hashedPassword, plainPassword, hashingOptions);

module.exports.verifyPassword = verifyPassword;

const hashPassword = (plainPassword) =>
  argon2.hash(plainPassword, hashingOptions);

module.exports.hashPassword = hashPassword;

module.exports.updateUser = async (user, resetPasswordToken) => {
  console.log({
    user,
    resetPasswordToken,
  });
  const passwordToken = resetPasswordToken.resetPasswordToken;
  const userID = user.id;
  console.log(passwordToken);
  console.log(userID);
  console.log(resetPasswordToken.hashedPassword);
  return axios
    .patch(
      `${process.env.AIRTABLE_API}/users`,
      {
        records: [
          {
            id: userID,
            fields: {
              resetPasswordToken: passwordToken,
              MDP: resetPasswordToken.hashedPassword,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .catch(console.error);
};

// module.exports.updateUser2 = async (
//   user,
//   resetPasswordToken,
//   hashedPassword
// ) => {
//   // console.log({
//   //   user,
//   //   resetPasswordToken,
//   //   hashedPassword,
//   // });
//   const passwordToken = resetPasswordToken.resetPasswordToken;
//   const userID = user.id;
//   console.log(userID);
//   return axios
//     .patch(
//       `${process.env.AIRTABLE_API}/users`,
//       {
//         records: [
//           {
//             id: userID,
//             fields: {
//               resetPasswordToken: passwordToken,
//               MDP: hashedPassword,
//             },
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
//         },
//       }
//     )
//     .catch(console.error);
// };
