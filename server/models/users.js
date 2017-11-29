/** Users database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Users model
 */
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
      fname: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
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
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
  });
  Users.associate = (models) => {
      Users.hasMany(models.Centers, {
          foreignKey: 'userId'
      });
      Users.hasMany(models.Events, {
          foreignKey: 'userId'
      });
  };
  return Users;
};