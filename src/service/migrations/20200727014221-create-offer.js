'use strict';
/* eslint-disable new-cap */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`offers`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      picture: {
        type: Sequelize.JSON
      },
      type: {
        type: Sequelize.STRING
      },
      sum: {
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: `users`
          },
          key: `id`
        },
        onDelete: `cascade`,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(`offers`);
  }
};
