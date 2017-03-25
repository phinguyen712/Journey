'use strict';
module.exports = function(sequelize, DataTypes) {
  const Journey = sequelize.define('Journey', {
    journeyName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    caption: {
      type:DataTypes.STRING
    },
    published: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    days:DataTypes.ARRAY(DataTypes.JSON({
      journeySchedule:DataTypes.ARRAY(DataTypes.STRING)
    })),
  }, {
    classMethods: {
      associate: (models) => {
        Journey.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      },
    }
  });
  return Journey;
};
