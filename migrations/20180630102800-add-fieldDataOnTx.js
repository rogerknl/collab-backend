'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Transactions',
      'date',
      {
        type: Sequelize.DATE,
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Transactions',
      'date'
    );
  }
};