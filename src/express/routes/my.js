'use strict';

const {Router} = require(`express`);
const {logger} = require(`../../utils`).logger;
const api = require(`../api-services`);

const router = new Router();

module.exports = (_app) => {
  router.get(`/`, async (req, res) => {
    let offers = [];

    try {
      offers = await api.offers.fetch({limit: 8});
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/my-tickets`, {offers});
  });

  router.get(`/comments`, async (req, res) => {
    let offers = [];
    let hasComments = false;

    try {
      offers = await api.offers.fetch({limit: 3});
      for (let offer of offers) {
        const comments = await api.comments.fetch(offer.id);
        offer.comments = comments;
        hasComments = hasComments || comments.length > 0;
      }
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/comments`, {offers, hasComments});
  });

  return router;
};
