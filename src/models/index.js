import Sequelize from 'sequelize';

import getUserModel from './user';
import getProductModel from './product';
import getOrderDetileModel from './orderDetile';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Product: getProductModel(sequelize, Sequelize),
  OrderDetile: getOrderDetileModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
