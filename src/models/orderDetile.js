const getOrderDetileModel = (sequelize, { DataTypes }) => {
  const OrderDetile = sequelize.define('order_detile', {
    quantity: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  OrderDetile.associate = (models) => {
    OrderDetile.hasOne(models.Product, { onDelete: '' });
  };

  return OrderDetile;
};

export default getOrderDetileModel;
