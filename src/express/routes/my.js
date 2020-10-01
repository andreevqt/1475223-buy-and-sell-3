'use strict';

const {Router} = require(`express`);
const api = require(`../api-services`);
const upload = require(`../middleware/upload`);
const csrf = require(`../middleware/csrf`);

const router = new Router();

module.exports = (_app) => {
  router.get(`/`, async (req, res, next) => {
    try {
      const {currentUser} = res.locals;
      const {page, limit} = req.query;
      const offers = await api.offers.fetch({page, limit, authorId: currentUser.id});
      res.render(`pages/my-tickets`, {offers});
    } catch (err) {
      next(err);
    }
  });

  // TODO: fixme
  router.get(`/comments`, async (req, res, next) => {
    try {
      let hasComments = false;
      const {currentUser} = res.locals;
      const {page, limit} = req.query;
      const offers = await api.offers.fetch({page, limit, authorId: currentUser.id});
      for (let offer of offers) {
        const comments = await api.comments.fetch(offer.id);
        offer.comments = comments;
        hasComments = hasComments || comments.length > 0;
      }
      res.render(`pages/comments`, {offers, hasComments});
    } catch (err) {
      next(err);
    }
  });

  router.get(`/settings`, csrf, async (req, res) => {
    res.render(`pages/settings`);
  });

  router.post(`/settings`, upload.single(`avatar`), csrf, async (req, res, next) => {
    try {
      const {currentUser} = res.locals;
      const avatar = req.file ? req.file.buffer.toString(`base64`) : undefined;
      const attrs = {avatar, ...req.body};
      const {errors} = await api.users.update(currentUser.id, attrs);
      if (errors) {
        res.render(`pages/settings`, {errors});
        return;
      }

      res.redirect(`back`);
    } catch (err) {
      next(err);
    }
  });

  router.get(`/reset-password`, csrf, async (req, res) => {
    res.render(`pages/reset-password`);
  });

  router.post(`/reset-password`, csrf, async (req, res, next) => {
    try {
      const {newPassword, oldPassword, confirmPassword} = req.body;

      if (confirmPassword !== newPassword) {
        const errors = {
          newPassword: `Пароли должны совпадать`,
          confirmPassword: `Пароли должны совпадать`
        };
        res.render(`pages/reset-password`, {errors});
        return;
      }

      const {errors} = await api.users.resetPassword(oldPassword, newPassword);
      if (errors) {
        res.render(`pages/reset-password`, {errors});
        return;
      }

      res.redirect(`/logout`);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
