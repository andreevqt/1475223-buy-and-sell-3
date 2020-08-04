'use strict';

const BaseModel = require(`./BaseModel`);

module.exports = (sequelize, DataTypes) => {
  class OfferCategory extends BaseModel {
    static associate(models) {
      OfferCategory.belongsTo(models.Offer);
      OfferCategory.belongsTo(models.Category);
    }
  }

  OfferCategory.init({
    offerId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: `OfferCategory`,
    tableName: `offers_categories`,
    timestamps: false
  });

  return OfferCategory;
};
