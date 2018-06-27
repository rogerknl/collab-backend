'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Wallets',
      'alias',
      {
        type: Sequelize.STRING,
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Wallets',
      'alias'
    );
  }
};