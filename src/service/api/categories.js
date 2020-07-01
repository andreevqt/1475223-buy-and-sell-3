'use strict';

const {Router} = require(`express`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(200).json(categories);
  });

  router.get(`/:categoryId`, (req, res) => {
    const categoryId = +req.params.categoryId;
    const category = service.findOne(categoryId);
    if (!category) {
      res.status(404).send(`Not found`);
      return;
    }

    res.status(200).send(category);
  });
};
