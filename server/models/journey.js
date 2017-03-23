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
    publishDate: {
      type:DataTypes.STRING
    },
    published: {
      type:DataTypes.STRING
    },
    images: {
      type:DataTypes.STRING
    },
    likes: {
      type:DataTypes.ARRAY
    },
    days:{
      type:DataTypes.ARRAY
    }
  }, {
    classMethods: {
      associate: (models) => {
        Journey.belongsTo(models.Users, {
          foreignKey: 'todoId',
          onDelete: 'CASCADE',
        });
      },
    }
  });
  return Journey;
};
