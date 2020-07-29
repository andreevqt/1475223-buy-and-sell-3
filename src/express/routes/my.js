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
      offers = (await axios.get(`${url}/offers?limit=8`)).data;
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/my-tickets`, {offers});
  });

  router.get(`/comments`, async (req, res) => {
    let offers = [];
    let hasComments = false;

    try {
      offers = (await axios.get(`${url}/offers?limit=3`)).data;
      for (let i = 0; i < offers.length; i++) {
        const offer = offers[i];
        const comments = (await axios.get(`${url}/offers/${offer.id}/comments`)).data;
        hasComments = hasComments || comments.length > 0;
        offer.comments = comments;
      }
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/comments`, {offers, hasComments});
  });

  return router;
};
