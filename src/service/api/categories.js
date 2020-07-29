'use strict';

const {Router} = require(`express`);

const router = new Router();

module.exports = (app, services) => {
  app.use(`/categories`, router);

  router.get(`/`, async (req, res) => {
    const categories = await services.categories.findAll();
    res.status(200).json(categories);
  });

  router.get(`/:categoryId`, async (req, res) => {
    const categoryId = +req.params.categoryId;
    const category = await services.categories.findById(categoryId);
    if (!category) {
      res.status(404).send(`Not found`);
      return;
    }

    res.status(200).send(category);
  });
};
