'use strict';

const BaseModel = require(`./BaseModel`);
const cryptService = require(`../crypt-service`);

module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    static associate(models) {
      User.hasMany(models.Offer, {
        foreignKey: `authorId`
      });
    }
  }

  User.init({
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(pass) {
        this.setDataValue(`password`, cryptService.hash(pass));
      }
    },
    avatar: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: `Email address already in use`
      }
    }
  }, {
    sequelize,
    modelName: `User`,
    tableName: `users`
  });

  User.beforeFind((options) => {
    options.attributes = options.attributes || {};
    options.attributes.exclude = [`password`, `createdAt`, `updatedAt`];
    return options;
  });

  return User;
};

