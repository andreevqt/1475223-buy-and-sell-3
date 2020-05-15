'use strict';

const {Router} = require(`express`);
const axios = require(`axios`);
const {logger} = require(`../../utils`).logger;
const {latestOffers, popularOffers} = require(`../helpers`);

const router = new Router();

module.exports = (app) => {
  const url = app.get(`api_url`);

  router.get(`/`, async (req, res) => {
    let categories = [];
    let latest = [];
    let popular = [];
    let hasData = false;

    try {
      categories = (await axios.get(`${url}/categories`)).data;
      const results = (await axios.get(`${url}/offers`)).data;

      hasData = results.length > 0;

      latest = latestOffers(results);
      popular = popularOffers(results);

    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/index`, {latest, popular, categories, hasData});
  });

  router.get(`/search`, async (req, res, _next) => {
    const {query} = req.query;
    let offers = [];
    let latest = [];

    try {
      const response = (await axios.get(`${url}/offers`)).data;
      latest = latestOffers(response);
      offers = (await axios.get(`${url}/search`, {params: {query}})).data;
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/search`, {offers, latest});
  });

  router.get(`/login`, (_req, res, _next) => res.render(`pages/login`));
  router.get(`/register`, (_req, res, _next) => res.render(`pages/register`));
  return router;
};
