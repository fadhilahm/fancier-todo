"use strict";
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already in use"
        },
        validate: {
          notNull: {
            msg: "Email must not be empty"
          },
          notEmpty: {
            args: true,
            msg: "Email must not be empty"
          },
          isEmail: {
            args: true,
            msg: "Email must be filled with a valid email"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password must be filled"
          },
          notEmpty: {
            args: true,
            msg: "Password must be filled"
          },
          len: {
            args: [3],
            msg: "Password must at least have 3 characters"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        }
      },
      sequelize,
      modelName: "User"
    }
  );
  return User;
};
