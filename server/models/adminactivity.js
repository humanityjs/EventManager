export default (sequelize, DataTypes) => {
  const Adminactivities = sequelize.define('Adminactivities', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });
  Adminactivities.associate = (models) => {
    Adminactivities.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Adminactivities;
};