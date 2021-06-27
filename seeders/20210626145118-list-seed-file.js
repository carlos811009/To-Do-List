'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Lists',
      Array.from({ length: 10 }).map(each => ({
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        isTrashed: true,
        isFinished: false,
      })), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lists', null, {});

  }
};
