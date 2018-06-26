'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wallets', {
      publickey: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      privatekey: {
        type: Sequelize.STRING,
        allowNull: false
      },
      wif: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wallets');
  }
};