'use strict';
const fs = require('fs')
const { encode } = require('../helpers/bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(fs.readFileSync('./student.json', 'utf8'))
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = encode(el.password)
    });
    await queryInterface.bulkInsert("Students", data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Students", null, {})
  }
};
