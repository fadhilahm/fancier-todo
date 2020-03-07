"use strict";
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
        validate: {
          notNull: {
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
          }
        }
      }
    },
    {
      sequelize,
      modelName: "User"
    }
  );
  return User;
};
