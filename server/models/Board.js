module.exports = function (sequelize, DataTypes) {
  const Board = sequelize.define('Board', {
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

  Board.associate = (models) => {
    models.Board.belongsToMany(models.User, { through: 'BoardUser' });
    models.Board.hasMany(models.List);
  }

  return Board;
};