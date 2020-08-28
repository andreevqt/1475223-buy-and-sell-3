'use strict';

/* eslint-disable new-cap */

const BaseModel = require(`./BaseModel`);
const cryptService = require(`../crypt-service`);
const config = require(`../../../config`);
const jwt = require(`jsonwebtoken`);

module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    toExclude() {
      return [`password`, `createdAt`, `updatedAt`];
    }

    generateToken() {
      if (!config.jwt.secret.access) {
        throw Error(`JWT secret key is missing`);
      }

      const data = this.getData();
      return jwt.sign(data, config.jwt.secret.access, {expiresIn: config.jwt.expiresIn});
    }

    getData() {
      return {
        userId: this.id,
        email: this.email
      };
    }

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
    avatar: {
      type: DataTypes.STRING(512),
      get: BaseModel.getThumbnail(`avatar`)
    },
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

  return User;
};

