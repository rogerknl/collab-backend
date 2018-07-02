'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Operations',
      'user_to_act',
      {
        type: Sequelize.STRING,
        allowNull: true
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Operations',
      'user_to_act',
    );
  }
};