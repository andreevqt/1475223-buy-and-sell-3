'use strict';

const {Router} = require(`express`);
const upload = require(`../middleware/upload`);
const checkAuth = require(`../middleware/checkAuth`);
const checkAuthor = require(`../middleware/checkAuthor`);
const csrf = require(`../middleware/csrf`);
const api = require(`../api-services`);

module.exports = (_app) => {
  const router = new Router();

  const types = [
    {label: `Куплю`, value: `buy`},
    {label: `Продам`, value: `sell`},
  ];

  router.param(`offerId`, async (req, res, next, id) => {
    try {
      const offer = await api.offers.get(id);
      res.locals.offer = offer;
      next();
    } catch (err) {
      res.status(404).render(`errors/404`);
    }
  });

  router.param(`authorId`, async (req, res, next, id) => {
    try {
      const author = await api.users.get(id);
      res.locals.author = author;
      next();
    } catch (err) {
      res.status(404).render(`errors/404`);
    }
  });

  router.get(`/add`, [checkAuth, ...csrf], async (_req, res, next) => {
    try {
      const formData = {category: [], type: `buy`};
      const categories = await api.categories.fetch();
      res.render(`pages/offers/ticket-add`, {formData, categories, types});
    } catch (err) {
      next(err);
    }
  });

  router.post(`/add`, [checkAuth, upload.single(`picture`), ...csrf], async (req, res, next) => {
    try {
      const picture = req.file ? req.file.buffer.toString(`base64`) : undefined;
      const formData = {picture, category: [], ...req.body};
      if (!Array.isArray(formData.category)) {
        formData.category = [formData.category];
      }

      const categories = await api.categories.fetch();
      const {errors} = await api.offers.create(formData);
      if (errors) {
        res.render(`pages/offers/ticket-add`, {formData, categories, types, errors});
        return;
      }

      res.redirect(`/my`);
    } catch (err) {
      next(err);
    }
  });

  router.get(`/:offerId`, csrf, async (_req, res) => {
    try {
      const {offer} = res.locals;
      const comments = await api.comments.fetch(offer.id);

      res.render(`pages/offers/ticket`, {offer, comments});
    } catch (err) {
      res.status(404).render(`errors/404`);
    }
  });

  router.post(`/:offerId`, [checkAuth, ...csrf], async (req, res) => {
    const {offer} = res.locals;
    const comment = req.body;

    try {
      await api.offers.addComment(offer.id, comment);
      res.redirect(`back`);
    } catch (err) {
      res.status(404).render(`errors/404`);
    }
  });

  router.get(`/edit/:offerId`, [checkAuth, checkAuthor, ...csrf], async (req, res) => {
    try {
      const formData = res.locals.offer;
      const categories = await api.categories.fetch();
      res.render(`pages/offers/ticket-edit`, {formData, categories, types});
    } catch (err) {
      res.status(404).render(`errors/404`);
    }
  });

  router.post(`/edit/:offerId`, [checkAuth, checkAuthor, upload.single(`picture`), ...csrf], async (req, res, next) => {
    try {
      const {offerId} = req.params;
      const picture = req.file ? req.file.buffer.toString(`base64`) : undefined;
      const formData = {picture, category: [], ...req.body};
      const categories = await api.categories.fetch();
      const {errors} = await api.offers.update(offerId, formData);
      if (errors) {
        res.render(`pages/offers/ticket-edit`, {formData, categories, types, errors});
        return;
      }

      res.redirect(`/my`);
    } catch (err) {
      next(err);
    }
  });

  router.get(`/category/:categoryId`, async (req, res) => {
    try {
      const {categoryId} = req.params;
      const {query, page, limit} = req.query;
      const offers = await api.offers.fetchByCat({id: categoryId, query, page, limit});
      const categories = await api.categories.fetch();
      const category = await api.categories.get(categoryId);
      res.render(`pages/category`, {offers, category, categories});
    } catch (err) {
      res.status(404).render(`errors/404`);
    }
  });

  router.get(`/author/:authorId`, async (req, res) => {
    try {
      const {author} = res.locals;
      const {query, page, limit} = req.query;
      const offers = await api.offers.fetchByAuthor({id: author.id, query, page, limit});
      res.render(`pages/author`, {offers});
    } catch (err) {
      res.status(404).render(`errors/404`);
    }
  });

  return router;
};
