'use strict';
module.exports = (sequelize, DataTypes) => {
  var Centers = sequelize.define('Centers', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    facilities: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Centers;
};