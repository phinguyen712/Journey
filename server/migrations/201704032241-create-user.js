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
      currentJourneyId: {
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Journeys',
          key:'id',
          as: 'currentJourneyId',
        }
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
