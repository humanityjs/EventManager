module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  fullName: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0
},
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.Center, {
          foreignKey: 'UserId',
	        onDelete: 'CASCADE'
        });
      }
    }
  });
  return User;
};