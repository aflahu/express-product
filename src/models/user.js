import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

function hashPassword(user) {
  if (user.changed('password')) {
    return bcrypt
      .hash(user.password, SALT_ROUNDS)
      .then((hashedPass) => {
        user.password = hashedPass;
      });
  }
}

const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
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
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    },
  );

  User.isValidPassword = function (password) {
    console.log('password');
    return bcrypt.compareSync(password, this.password);
  };

  User.generateAuthToken = function (user) {
    const token = jwt
      .sign({ id: user.id.toString() }, 'thisismynewcourse', {
        expiresIn: '7 days',
      })
      .toString();

    return token;
  };

  return User;
};

export default getUserModel;
