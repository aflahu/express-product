const getProductModel = (sequelize, { DataTypes }) => {
  const Order = sequelize.define('order', {
   
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
    Order.hasMany(models.orderDetile, { onDelete: 'CASCADE' });
  };

  return Product;
};

export default getProductModel;
