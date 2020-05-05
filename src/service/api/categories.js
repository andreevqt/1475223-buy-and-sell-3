'use strict';

const {Router} = require(`express`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(200).json(categories);
  });
};
