'use strict';

const BaseService = require(`./BaseService`);
const {ValidationError} = require(`express-validation`);
const {UniqueConstraintError} = require(`sequelize`);
const _ = require(`lodash`);

class UserService extends BaseService {
  async create(attrs) {
    const user = (await super.create(attrs)).toJSON();
    return _.omit(user, `password`);
  }

  checkDuplicateEmail(err) {
    if (err instanceof UniqueConstraintError || err instanceof ValidationError) {
      const errors = {
        body: [
          {
            message: `Email уже используется`,
            context: {
              key: `email`
            }
          }
        ]
      };

      if (err instanceof ValidationError) {
        err.details.body = err.details.body || [];
        err.details.body = [...err.details.body, ...errors.body];
        return err;
      }

      return new ValidationError(errors, {
        statusCode: 400
      });
    }

    return err;
  }
}

module.exports = UserService;
