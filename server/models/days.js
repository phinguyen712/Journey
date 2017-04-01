'use strict';
module.exports = function(sequelize, DataTypes) {
  var Days = sequelize.define('Days', {
    places: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    classMethods: {
      associate: function(models) {
        Days.belongsTo(models.Journey, {
          foreignKey: 'journeysId',
          onDelete: 'CASCADE',
        });

        Days.belongsToMany(models.Yelps,{
          foreignKey: 'daysId',
          through: 'day_yelp',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Days;
};
