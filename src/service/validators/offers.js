'use strict';

const {Joi} = require(`express-validation`);

const type = (value, helpers) => {
  const types = [`buy`, `sell`];
  if (!types.includes(value)) {
    return helpers.error(`any.invalid`);
  }

  return value;
};

module.exports = {
  id: {
    params: Joi.object({
      offerId: Joi.number().required(),
    })
  },

  create: {
    body: Joi.object({
      title: Joi.string().label(`Заголовок`)
        .required().min(10).max(1000),
      description: Joi.string().label(`Описание`)
        .required().min(50).max(1000),
      category: Joi.array().label(`Категория`).required().min(1).items(Joi.number()),
      sum: Joi.number().label(`Цена`).required().min(100),
      picture: Joi.string().label(`Изображение`).required(),
      type: Joi.custom(type, `type`).label(`Тип`).required()
    })
  },

  update: {
    body: Joi.object({
      title: Joi.string().label(`Заголовок`).min(10).max(1000),
      description: Joi.string().label(`Описание`).min(50).max(1000),
      category: Joi.array().label(`Категория`).min(1).items(Joi.number()),
      sum: Joi.number().label(`Цена`).min(100),
      picture: Joi.string().label(`Изображение`).allow(null),
      type: Joi.custom(type, `type`).label(`Тип`)
    })
  },

  list: {
    query: Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      order: Joi.string()
    })
  }
};
