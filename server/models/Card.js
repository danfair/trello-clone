module.exports = function (sequelize, DataTypes) {
  const Card = sequelize.define('Card', {
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

  Card.associate = (models) => {
    models.Card.hasMany(models.Comment);
    models.Card.belongsTo(models.List);
    models.Card.belongsTo(models.User, { as: 'Author' });
  }

  return Card;
};