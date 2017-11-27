export default (sequelize, DataTypes) => {
  const dbEvents = sequelize.define('dbEvents', {
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      centerId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      booked_date: {
          type: DataTypes.DATE,
          allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  });
  dbEvents.associate = (models) => {
    dbEvents.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASACADE',
      });
    dbEvents.belongsTo(models.dbCenters, {
      foreignKey: 'userId',
      onDelete: 'CASACADE',
      });
  };
  return dbEvents;
};