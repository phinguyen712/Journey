'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Journeys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      journeyName: {
        type: Sequelize.STRING
      },
      caption: {
        type:Sequelize.STRING
      },
      published: {
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      days:Sequelize.ARRAY(Sequelize.JSON({
        'journeySchedule':Sequelize.ARRAY(Sequelize.STRING)
      })),
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
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
  down: function(queryInterface , Sequelize ) {
    return queryInterface.dropTable('Journeys');
  }
};
