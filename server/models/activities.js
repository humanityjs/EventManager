export default (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    centerId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Centers',
        key: 'id',
      },
    },
  });
  Activities.associate = (models) => {
    Activities.belongsTo(models.Events, {
      foreignKey: 'eventId',
    });
    Activities.belongsTo(models.Centers, {
      foreignKey: 'centerId',
    });
  };
  return Activities;
};