'use strict';

const {Joi} = require(`express-validation`);

module.exports = {
  create: {
    body: Joi.object({
      text: Joi.string().required().min(10).max(1000),
    })
  },

  update: {
    body: Joi.object({
      text: Joi.string().required().min(10).max(1000),
    })
  }
};
