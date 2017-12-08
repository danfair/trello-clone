module.exports = function (sequelize, DataTypes) {
  const Board = sequelize.define('Board', {
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
    name: {
      type: DataTypes.STRING,
      required: true
    },
    updatedAt: DataTypes.DATE
  });

  Board.associate = (models) => {
    models.Board.belongsToMany(models.User, { through: 'BoardUser' });
    models.Board.hasMany(models.List);
  }

  return Board;
};