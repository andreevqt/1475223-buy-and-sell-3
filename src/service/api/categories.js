'use strict';

const {Router} = require(`express`);
const {parseQuery} = require(`../middleware`);

const router = new Router();

module.exports = (app, services) => {
  app.use(`/categories`, router);

  router.get(`/`, parseQuery, async (req, res) => {
    const {page, limit} = res.locals.query;
    const categories = await services.categories.paginate(page, limit);
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
