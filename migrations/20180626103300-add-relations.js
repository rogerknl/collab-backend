'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'AddressBooks',
      'wallet_id',
      {
        type: Sequelize.STRING,
        references: {
          model: 'Wallets',
          key: 'publickey',
        }
      }
    )
    .then(()=> {
      return queryInterface.addColumn(
        'Transactions',
        'wallet_id',
        {
          type: Sequelize.STRING,
          references: {
            model: 'Wallets',
            key: 'publickey',
          }
        }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'AddressBooks',
      'wallet_id'
    ).then(()=>{
      return queryInterface.removeColumn(
        'Transactions',
        'wallet_id'
      )
    });
  }
};