export default (sequelize, DataTypes) => {
  const dbCenters = sequelize.define('dbCenters', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    facilities: {
      type: DataTypes.ARRAY,
      allowNull: false
    },
    description: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  dbCenters.associate = (models) => {
    dbCenters.belongsTo(models.Users, {
      foreignKey: 'userId',
      });
    dbCenters.hasMany(models.dbEvents, {
      foreignKey: 'centerId'
      });
  };
  return dbCenters;
};