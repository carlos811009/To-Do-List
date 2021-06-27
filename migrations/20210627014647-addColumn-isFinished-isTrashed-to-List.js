'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Lists', 'isFinished',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      });
    await queryInterface.addColumn('Lists', 'isTrashed',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Lists', 'isFinished');
    await queryInterface.removeColumn('Lists', 'isTrashed');
  }
};
