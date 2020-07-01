'use strict';

const {Router} = require(`express`);
const axios = require(`axios`);
const {logger} = require(`../../utils`).logger;

const router = new Router();

module.exports = (app) => {
  const url = app.get(`api_url`);

  router.get(`/`, async (req, res) => {
    let offers = [];

    try {
      const results = (await axios.get(`${url}/offers`)).data;
      offers = results.splice(0, 8);
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/my-tickets`, {offers});
  });

  router.get(`/comments`, async (req, res) => {
    let offers = [];
    let hasComments = false;

    try {
      const results = (await axios.get(`${url}/offers`)).data;
      offers = results.splice(0, 3);
      hasComments = offers.some((offer) => offer.comments.length > 0);
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/comments`, {offers, hasComments});
  });

  return router;
};
