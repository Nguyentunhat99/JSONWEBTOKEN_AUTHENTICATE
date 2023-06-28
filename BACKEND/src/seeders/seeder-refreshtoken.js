"use strict";
const { v4: uuidv4 } = require("uuid");

let _token = uuidv4();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("refresh_token", [
      {
        token: _token,
        user_Id: 60,
        expiryDate: new Date(1687338083347),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
