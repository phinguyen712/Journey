'use strict';
module.exports = function(sequelize, DataTypes) {
  const Journey = sequelize.define('Journey', {
    journeyName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    caption: {
      type:DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Journey.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });

        Journey.hasMany(models.Day, {
          foreignKey: 'daysId',
          as:'days',
          onDelete: 'CASCADE',
        });


      },
    }
  });
  return Journey;
};
