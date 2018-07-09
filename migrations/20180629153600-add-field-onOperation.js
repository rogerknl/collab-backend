'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Operations',
      'closed_at',
      {
        type: Sequelize.DATE,
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Operations',
      'closed_at'
    );
  }
};