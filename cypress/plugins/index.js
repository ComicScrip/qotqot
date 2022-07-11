/// <reference types="cypress" />
const User = require("../../models/user");
const ms = require("smtp-tester");
const dotenvPlugin = require("cypress-dotenv");

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  config = dotenvPlugin(config);
  const mailServer = ms.init(7777);
  const lastEmail = {};
  mailServer.bind((addr, id, email) => {
    lastEmail[email.headers.to] = {
      body: email.body,
      html: email.html,
    };
  });
  on("task", {
    createSampleUser: async ({
      name = "test",
      email = "test@test.com",
      password = "test1234456",
      active = true,
    } = {}) =>
      User.createUser({
        active,
        email,
        name,
        password,
      }),
    findUserByEmail: User.findByEmail,
    createUser: User.createUser,
    getLastEmail(userEmail) {
      return lastEmail[userEmail] || null;
    },
  });
  return config;
};
