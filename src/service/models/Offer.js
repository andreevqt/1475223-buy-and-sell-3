'use strict';

/* eslint-disable object-shorthand */

const BaseModel = require(`./BaseModel`);
const {Sequelize} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {
  class Offer extends BaseModel {
    static associate(models) {
      Offer.belongsToMany(models.Category, {
        through: `offers_categories`,
        foreignKey: `offerId`,
        as: `category`
      });
      Offer.hasMany(models.Comment, {
        foreignKey: `offerId`,
        as: `comments`
      });
      Offer.belongsTo(models.User, {
        as: `author`,
        onDelete: `cascade`,
        onUpdate: `no action`
      });
    }

    static findByCategory(page, limit, categoryId) {
      return this.paginate(page, limit, {
        where: {
          id: {
            [Sequelize.Op.in]: [sequelize.literal(`(SELECT "offerId" FROM "offers_categories" WHERE "categoryId" = ${categoryId})`)]
          }
        }
      });
    }

    static getQueryOptions() {
      const {User, Category} = sequelize.models;

      const include = [{
        model: User, as: `author`,
        attributes: [`id`, `name`, `email`]
      }, {
        model: Category,
        as: `category`,
        attributes: [`id`, `name`],
        through: {attributes: []}
      }];

      const attributes = {
        exclude: [
          `authorId`,
        ],
        include: [
          [sequelize.literal(`(
            SELECT COUNT(*) FROM "comments"
            WHERE "offerId" = "Offer"."id"
            GROUP BY "offerId"
          )`), `commentsCount`]
        ]
      };

      const order = [
        [`createdAt`, `desc`]
      ];

      return {include: include, attributes, order: order};
    }
  }

  Offer.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: {
      type: DataTypes.JSON,
      set: function (value) {
        const picture = {
          orig: `/img/${value}`,
          big: `/img/${value}`,
          small: `/img/${value}`
        };
        this.setDataValue(`picture`, picture);
      }
    },
    type: {type: DataTypes.STRING, defaultValue: `buy`},
    sum: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: `Offer`,
    tableName: `offers`
  });

  return Offer;
};
