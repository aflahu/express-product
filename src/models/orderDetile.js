const getProductModel = (sequelize, { DataTypes }) => {
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

  Order.associate = (models) => {
    Order.hasOne(models.Product, { onDelete: 'CASCADE' });
  };

  return Product;
};

export default getProductModel;
