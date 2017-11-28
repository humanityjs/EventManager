
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  bookedDate: {
      type: DataTypes.DATE,
      unique: true,
      allowNull: false
  },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Event.belongsTo(models.Users, {
          foreignKey: 'UserId',
	      onDelete: 'CASCADE'
        });
        Event.belongsTo(models.Center, {
          foreignKey: 'CenterId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Event;
};