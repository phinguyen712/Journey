'use strict';
module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    username: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    liked:{
      type:DataTypes.ARRAY
    },
    favorites: {
      type:DataTypes.ARRAY
    },

  }, {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Journey, {
          foreignKey: 'journeyId',
          as:'journeyIds',
        });
      },
    }
  });
  return Users;
};
