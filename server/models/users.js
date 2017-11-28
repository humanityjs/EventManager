module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
    unique: true,
    allowNull: false
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
  return Users;
};