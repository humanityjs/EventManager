/** Define Centers database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Centers model
 */
export default (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
      cname: {
          type: DataTypes.STRING,
          allowNull: false
      },
      location: {
          type: DataTypes.STRING,
          allowNull: false
      },
      facilities: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
          type: DataTypes.INTEGER,
          references: {
              model: 'Users',
              key: 'id'
          }
      }
  });
  Centers.associate = (models) => {
      Centers.belongsTo(models.Users, {
          foreignKey: 'userId'
      });
      Centers.hasMany(models.Events, {
          foreignKey: 'centerId'
      });
  };
  return Centers;
};