"use strict";
const { addOneDay } = require("../helpers/addOneDay");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be empty"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cannot be empty"
          }
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: addOneDay(),
        validate: {
          isAfter: {
            args: String(new Date()),
            msg: "Due date must be later than now"
          },
          isDate: {
            args: true,
            msg: "Due date must be a valid date format"
          }
        }
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      UserId: {
        type: DataTypes.INTEGER
      }
    },
    {
      hooks: {
        beforeValidate: (todo, options) => {
          if (todo.due_date === "") {
            todo.due_date = addOneDay();
          }
        }
      },
      sequelize,
      modelName: "Todo"
    }
  );

  return Todo;
};
