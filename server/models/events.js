/** Events database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Events model
 */
export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      bookedDate: {
          type: DataTypes.DATE,
          unique: true,
          allowNull: false
      },
      centerId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: 'Users',
            key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: 'Users',
            key: 'id'
        }
      }
  });
  Events.associate = (models) => {
      Events.belongsTo(models.Centers, {
          foreignKey: 'centerId'
      });
      Events.hasMany(models.Users, {
          foreignKey: 'userId'
      });
  };
  return Events;
};