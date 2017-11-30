
module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  location: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
  },
  description: {
      type: DataTypes.STRING,
      allowNull: false
  },
  facilities: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Center.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Center;
};