'use strict';

const {Router} = require(`express`);
const _ = require(`lodash`);
const {logger} = require(`../../utils`).logger;
const api = require(`../api-services`);
const upload = require(`../middleware/upload`);

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

  router.get(`/search`, async (req, res) => {
    const {query, page, limit} = req.query;
    let offers = [];
    let latest = [];

    try {
      latest = await api.offers.fetch({limit: 4});
      offers = await api.search.fetch({query, page, limit});
      offers.paginator.append(`query`, query);
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/search`, {offers, latest});
  });

  router.get(`/login`, (_req, res) => res.render(`pages/login`));

  router.get(`/register`, (_req, res) => {
    res.render(`pages/register`, {formData: {}});
  });

  router.post(`/register`, upload.single(`avatar`), async (req, res) => {
    let errors;
    const {password, confirmPassword} = req.body;
    const avatar = req.file ? req.file.filename : undefined;
    const formData = {avatar, ..._.omit(req.body, `confirmPassword`)};

    if (password !== confirmPassword) {
      errors = {
        password: `Пароли должны совпадать`,
        confirmPassword: `Пароли должны совпадать`
      };
      res.render(`pages/register`, {formData, errors});
      return;
    }

    try {
      await api.users.create(formData);
    } catch (err) {
      errors = err.response.data.body;
      res.render(`pages/register`, {formData, errors});
      return;
    }

    res.redirect(`/`);
  });

  return router;
};
