'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'UserWallets',
      'user_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      }
    ).then(()=> {
      return queryInterface.addColumn(
        'UserWallets',
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
      'UserWallets',
      'wallet_id'
    ).then(()=>{
      return queryInterface.removeColumn(
        'UserWallets',
        'user_id'
      );
    });
  }
};