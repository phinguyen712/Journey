'use strict';
module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
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
    favorites: {
      type:DataTypes.ARRAY(DataTypes.STRING),
      defaultValue:[]
    },
  }, {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Journey, {
          foreignKey: 'userId',
          as:'journeyId',
        });
      },
    }
  });
  return Users;
};
