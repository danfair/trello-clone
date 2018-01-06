module.exports = function (sequelize, DataTypes) {
  const List = sequelize.define('List', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      required: true
    },
    updatedAt: DataTypes.DATE
  });

  List.associate = (models) => {
    models.List.belongsTo(models.Board);
    models.List.hasMany(models.Card);
  }

  return List;
};