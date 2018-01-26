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
  });
  Activities.associate = (models) => {
    Activities.belongsTo(models.Events, {
      foreignKey: 'eventId',
    });
  };
  return Activities;
};