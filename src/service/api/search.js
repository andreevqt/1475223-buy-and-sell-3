'use strict';

const {Router} = require(`express`);

const router = new Router();

module.exports = (app, services) => {
  app.use(`/search`, router);

  router.get(`/`, async (req, res) => {
    const {query} = req.query;
    const results = await services.search.search(query);

    res.status(
      results.length > 0 ? 200 : 404
    ).json(results);
  });
};
