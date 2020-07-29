'use strict';

const BaseModel = require(`./BaseModel`);

module.exports = (sequelize, DataTypes) => {
  class Category extends BaseModel {
    static associate(models) {
      Category.belongsToMany(models.Offer, {
        through: `offers_categories`,
        foreignKey: `categoryId`,
        as: `offers`,
        timestamps: false,
      });
    }

    static getQueryOptions() {
      const attributes = {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM "offers_categories"
              WHERE "categoryId" = "Category"."id"
              GROUP BY "categoryId"
            )`), `offersCount`
          ]
        ]
      };

      return {attributes};
    }
  }

  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: `Category`,
    tableName: `categories`,
    timestamps: false
  });

  return Category;
};
