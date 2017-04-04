'use strict';


module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Yelps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      business: {
        type:Sequelize.JSON,
        allowNull:false
      },
      placeId:{
        type:Sequelize.STRING
      },
      usersId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          through:'user_favorite',
          foreignKey: 'usersId',
        },
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Yelps');
  }
};
