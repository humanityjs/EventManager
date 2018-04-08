export default (sequelize, DataTypes) => {
  const Adminactivities = sequelize.define('Adminactivities', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    suggestion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Adminactivities.associate = (models) => {
    Adminactivities.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Adminactivities;
};