module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
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
    updatedAt: DataTypes.DATE
  });

  Comment.associate = (models) => {
    models.Comment.belongsTo(models.User, { as: 'Author' });
    models.Comment.belongsTo(models.Card);
  }

  return Comment;
};