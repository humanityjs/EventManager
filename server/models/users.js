export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
      fullName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          
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
  });
  Users.associate = (models) => {
      Users.hasMany(models.dbEvents, {
          foreignKey: 'userId'
      });
      Users.hasMany(models.dbCenters, {
          foreignKey: 'userId'
      });
  };
  return Users;
};