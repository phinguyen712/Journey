'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      password: {
        type:Sequelize.STRING,
        allowNull:false
      },
      liked:{
        type:Sequelize.ARRAY(Sequelize.STRING)
      },
      favorites: {
        type:Sequelize.ARRAY(Sequelize.STRING),
        defaultValue:[]
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
    return queryInterface.dropTable('Users');
  }
};
