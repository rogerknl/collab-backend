'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Operations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      target: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      result: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
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
    return queryInterface.dropTable('Operations');
  }
};