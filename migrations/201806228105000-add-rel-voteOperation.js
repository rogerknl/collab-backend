'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Votes',
      'operation_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Operations',
          key: 'id'
        }
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Votes',
      'operation_id'
    );
  }
};