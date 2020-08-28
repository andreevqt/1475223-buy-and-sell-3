'use strict';

/* eslint-disable object-shorthand  */

const BaseModel = require(`./BaseModel`);

module.exports = (sequelize, DataTypes) => {
  class Comment extends BaseModel {
    static associate(models) {
      Comment.belongsTo(models.Offer, {
        as: `offer`,
        foreignKey: {
          allowNull: false,
        },
        onDelete: `cascade`,
        onUpdate: `no action`
      });
      Comment.belongsTo(models.User, {
        as: `author`,
        foreignKey: {
          allowNull: false
        },
        onDelete: `cascade`,
        onUpdate: `no action`
      });
    }

    static getQueryOptions() {
      const {User} = sequelize.models;
      const include = [{
        model: User,
        as: `author`,
        attributes: [`id`, `name`, `email`, `avatar`]
      }];
      const exclude = [`authorId`];

      const order = [
        [`createdAt`, `desc`]
      ];

      return {include: include, attributes: {exclude: exclude}, order: order};
    }
  }

  Comment.init({
    text: DataTypes.STRING,
    offerId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: `Comment`,
    tableName: `comments`
  });

  return Comment;
};
