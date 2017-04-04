'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    liked:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Journey, {
          foreignKey: 'journeysId',
          as:'journeys',
        });
        User.hasOne(models.Journey, {
          foreignKey: 'currentJourneyId',
          as:'currentJourney',
        });
        User.belongsToMany(models.Yelp, {
          defaultValue: [],
          foreignKey: 'favoritesId',
          through:'user_favorite',
          as:'favorites',
        });
      },
    }
  });
  return User;
};
