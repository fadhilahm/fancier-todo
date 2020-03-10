"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Todos", ["UserId"], {
      type: "foreign key",
      name: "fkey_UserId_Todos",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Todos", "fkey_UserId_Todos");
  }
};
