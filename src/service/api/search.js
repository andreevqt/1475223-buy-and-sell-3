'use strict';

const {Router} = require(`express`);
const {parseQuery} = require(`../middleware`);

const router = new Router();

module.exports = (app, services) => {
  app.use(`/search`, router);

  router.get(`/`, parseQuery, async (req, res) => {
    const {page, limit, rest} = res.locals.query;
    const results = await services
      .search.search(page, limit, {...rest, query: req.query.query});

    res.status(
      results.items.length > 0 ? 200 : 404
    ).json(results);
  });
};
