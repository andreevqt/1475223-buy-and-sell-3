'use strict';

const {Router} = require(`express`);
const _ = require(`lodash`);
const api = require(`../api-services`);
const upload = require(`../middleware/upload`);
const checkAuth = require(`../middleware/checkAuth`);

const router = new Router();

const setCookies = (res, tokens) => {
  res.cookie(`access_token`, tokens.access);
  res.cookie(`refresh_token`, tokens.refresh, {httpOnly: true});
};

const clearCookies = (res) => {
  res.clearCookie(`access_token`);
  res.clearCookie(`refresh_token`);
};

module.exports = (_app) => {
  router.get(`/`, async (_req, res, next) => {
    try {
      const categories = await api.categories.fetch();
      const latest = await api.offers.fetch({limit: 8});
      const popular = await api.offers.fetch({order: `popular`, limit: 8});
      const hasData = latest.length > 0;
      res.render(`pages/index`, {latest, popular, categories, hasData});
    } catch (err) {
      next(err);
    }
  });

  router.get(`/search`, async (req, res, next) => {
    try {
      const {query, page, limit} = req.query;
      const latest = await api.offers.fetch({limit: 4});
      const offers = await api.search.fetch({query, page, limit});
      offers.paginator.append(`query`, query);
      res.render(`pages/search`, {offers, latest});
    } catch (err) {
      next(err);
    }
  });

  router.get(`/login`, (_req, res) => {
    if (res.locals.currentUser) {
      res.redirect(`back`);
      return;
    }
    res.render(`pages/login`);
  });

  router.post(`/login`, async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const {result, errors} = await api.users.login(email, password);
      if (errors) {
        res.render(`pages/login`, {errors});
        return;
      }

      setCookies(res, result.tokens);
      res.redirect(`/my`);
    } catch (err) {
      next(err);
    }
  });

  router.get(`/logout`, checkAuth, async (req, res, next) => {
    try {
      const token = req.cookies.access_token;
      await api.users.logout(token);
      clearCookies(res);
      res.redirect(`/login`);
    } catch (err) {
      next(err);
    }
  });

  router.get(`/register`, (_req, res) => {
    res.render(`pages/register`, {formData: {}});
  });

  router.post(`/register`, upload.single(`avatar`), async (req, res, next) => {
    try {
      const {password, confirmPassword, email} = req.body;
      const avatar = req.file ? req.file.filename : undefined;
      const formData = {avatar, ..._.omit(req.body, `confirmPassword`)};

      if (password !== confirmPassword) {
        const errors = {
          password: `Пароли должны совпадать`,
          confirmPassword: `Пароли должны совпадать`
        };
        res.render(`pages/register`, {formData, errors});
        return;
      }

      const {errors} = await api.users.create(formData);
      if (errors) {
        res.render(`pages/register`, {formData, errors});
        return;
      }

      const {result} = await api.users.login(email, password);

      setCookies(res, result.tokens);
      res.redirect(`/my`);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
