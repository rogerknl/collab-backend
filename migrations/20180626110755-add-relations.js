'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Votes',
      'userwallet_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserWallets',
          key: 'id',
        }
      }
    ).then(()=> {
      return queryInterface.addColumn(
        'Operations',
        'userwallet_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'UserWallets',
            key: 'id',
          }
        }
      ).then(()=>{
        return queryInterface.addColumn(
          'Transactions',
          'operation_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Operations',
              key: 'id'
            }
          }
      )});
    });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Votes',
      'userwallet_id'
    ).then(()=>{
      return queryInterface.removeColumn(
        'Operations',
        'userwallet_id'
    )});
  }
};