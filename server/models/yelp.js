'use strict';
module.exports = function(sequelize, DataTypes) {
  const Yelp = sequelize.define('Yelp', {
    business: {
      type:DataTypes.JSON,
      allowNull:false
    },
    placeId:{
      type:DataTypes.STRING
    },
  },{
    classMethods: {
      associate: (models) => {
        Yelp.belongsToMany(models.User, {
          foreignKey: 'favoritesId',
          through:'user_favorite',
          as:'users',
          onDelete: 'CASCADE',
        });
      },
    }
  });
//define class methods
  return Yelp;
};
