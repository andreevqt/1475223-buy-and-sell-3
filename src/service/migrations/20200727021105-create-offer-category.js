'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`offers_categories`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offerId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: `offers`,
          },
          key: `id`
        },
        onDelete: `cascade`,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: `categories`,
          },
          key: `id`
        },
        onDelete: `cascade`,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(`offers_categories`);
  }
};
