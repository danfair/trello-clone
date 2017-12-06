module.exports = function (sequelize, DataTypes) {
  const List = sequelize.define('List', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  });

  // List.associate = (models) => {
  //   models.List.hasMany(models.group);
  // }

  return List;
};