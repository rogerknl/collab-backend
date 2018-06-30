'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'valid_email',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'valid_email',
    );
  }
};