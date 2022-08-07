const getOrderModel = (sequelize, { DataTypes }) => {
  const Order = sequelize.define('order', {
    status: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total: {
      type: DataTypes.NUMBER,
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
    Order.hasMany(models.OrderDetile, { onDelete: '' });
  };

  return Order;
};

export default getProductModel;
