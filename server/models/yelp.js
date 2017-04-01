'use strict';
module.exports = function(sequelize, DataTypes) {
  const Yelps = sequelize.define('Yelps', {
    business: {
      type:DataTypes.STRING,
      allowNull:false
    },
    placeId:{
      type:DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        Yelps.belongsToMany(models.Days, {
          foreignKey: 'yelpId',
          through:'day_yelp',
          onDelete: 'CASCADE',
        });
      },
    }
  });
//define class methods
  return Yelps;
};
