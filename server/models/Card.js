module.exports = function (sequelize, DataTypes) {
  const Card = sequelize.define('Card', {
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

  // Card.associate = (models) => {
  //   models.User.hasMany(models.group);
  // }

  return Card;
};