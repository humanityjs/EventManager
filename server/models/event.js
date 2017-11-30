
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
  title: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  bookedDate: {
      type: DataTypes.DATE,
      allowNull: false
  },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Event.belongsTo(models.Center, {
          foreignKey: 'CenterId',
          onDelete: 'CASCADE'
        });
        Event.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Event;
};