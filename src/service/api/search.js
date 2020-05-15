'use strict';

const {Router} = require(`express`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    const {query} = req.query;
    const results = service.search(query);

    res.status(
      results.length > 0 ? 200 : 404
    ).json(results);
  });
};
