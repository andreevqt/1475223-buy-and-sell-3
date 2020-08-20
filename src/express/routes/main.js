'use strict';

const {Router} = require(`express`);
// const axios = require(`axios`);
const {logger} = require(`../../utils`).logger;
const api = require(`../api-services`);

const router = new Router();

module.exports = (_app) => {
  router.get(`/`, async (req, res) => {
    let categories = [];
    let latest = [];
    let popular = [];

    let hasData = false;
    try {
      categories = await api.categories.fetch();
      latest = await api.offers.fetch({limit: 8});
      popular = await api.offers.fetch({order: `popular`, limit: 8});
      hasData = latest.length > 0;
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/index`, {latest, popular, categories, hasData});
  });

  router.get(`/search`, async (req, res, _next) => {
    const {query, page, limit} = req.query;
    let offers = [];
    let latest = [];

    try {
      latest = await api.offers.fetch({limit: 4});
      offers = await api.search.fetch({query, page, limit});
      offers.paginator.append(`query`, query);
    } catch (err) {
      console.log(err);
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/search`, {offers, latest});
  });

  router.get(`/login`, (_req, res, _next) => res.render(`pages/login`));
  router.get(`/register`, (_req, res, _next) => res.render(`pages/register`));
  return router;
};
