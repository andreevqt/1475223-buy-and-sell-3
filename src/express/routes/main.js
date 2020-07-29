'use strict';

const {Router} = require(`express`);
const axios = require(`axios`);
const {logger} = require(`../../utils`).logger;

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
      latest = (await axios.get(`${url}/offers?limit=8`)).data;
      popular = (await axios.get(`${url}/offers?order=popular&limit=8`)).data;
      hasData = latest.length > 0;
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
      latest = (await axios.get(`${url}/offers?limit=8`)).data;
      offers = (await axios.get(`${url}/search`, {params: {query}})).data;
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
