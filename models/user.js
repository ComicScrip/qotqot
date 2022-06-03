// const db = require("../db");
// const argon2 = require("argon2");
// const Joi = require("joi");

// const hashingOptions = {
//   memoryCost: 2 ** 16,
//   timeCost: 5,
//   type: argon2.argon2id,
// };

// const hashPassword = (plainPassword) =>
//   argon2.hash(plainPassword, hashingOptions);

// module.exports.validateUser = (data, forUpdate = false) =>
//   Joi.object({
//     email: Joi.string()
//       .email()
//       .max(255)
//       .presence(forUpdate ? "optional" : "required"),
//     password: Joi.string()
//       .min(8)
//       .max(100)
//       .presence(forUpdate ? "optional" : "required"),
//     name: Joi.string()
//       .max(255)
//       .presence(forUpdate ? "optional" : "required"),
//   }).validate(data, { abortEarly: false }).error;

// module.exports.emailAlreadyExists = (email) => {
//   return db.user.findUnique({ where: { email } }).then((user) => !!user);
// };

// module.exports.findUserByEmail = (email) =>
//   db.user.findUnique({ where: { email } }).catch(() => false);

// // module.exports.deleteAllUsers = db.user.deleteMany;

// // module.exports.deleteUserByEmail = (email) =>
// //   db.user.delete({ where: { email } }).catch(() => false);

// module.exports.hashPassword = hashPassword;

// module.exports.verifyPassword = (hash, plain) =>
//   argon2.verify(hash, plain, hashingOptions);

// module.exports.getSafeAttributes = (user) => ({
//   ...user,
//   hashedPassword: undefined,
// });
