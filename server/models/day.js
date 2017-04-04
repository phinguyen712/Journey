'use strict';
module.exports = function(sequelize, DataTypes) {
  var Day = sequelize.define('Day', {
    places: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    classMethods: {
      associate: function(models) {
        Day.belongsTo(models.Journey, {
          foreignKey: 'journeysId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Day;
};
