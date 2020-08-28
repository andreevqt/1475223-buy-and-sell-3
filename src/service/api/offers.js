'use strict';

/* eslint-disable object-shorthand */
const {Router} = require(`express`);
const {parseQuery, authorize, checkAuthor} = require(`../middleware`);
const validators = require(`../validators`);
const {validate} = require(`express-validation`);

const router = new Router();

module.exports = (app, services) => {
  app.use(`/offers`, router);

  router.param(`offerId`, async (req, res, next, id) => {
    if (!/^[0-9]+$/.test(id)) {
      res.status(400).send(`Id should be a number`);
      return;
    }

    const offer = await services.offers.findById(id);
    if (!offer) {
      res.status(404).send(`Not found`);
      return;
    }

    res.locals.offer = offer;
    next();
  });

  router.param(`commentId`, async (req, res, next, id) => {
    if (!/^[0-9]+$/.test(id)) {
      res.status(400).send(`Id should be a number`);
      return;
    }

    const {offer} = res.locals;
    const comment = await services.comments.findOne({
      where: {
        id,
        offerId: offer.id
      }
    });
    if (!comment) {
      res.status(404).send(`Not found`);
      return;
    }

    res.locals.comment = comment;
    next();
  });

  router.param(`authorId`, async (req, res, next, id) => {
    if (!/^[0-9]+$/.test(id)) {
      res.status(400).send(`Id should be a number`);
      return;
    }

    const author = await services.users.findById(id);
    if (!author) {
      res.status(404).send(`Not found`);
      return;
    }

    res.locals.author = author;
    next();
  });

  router.get(`/`, [validate(validators.offers.list), parseQuery], async (_req, res) => {
    const {page, limit, order, where} = res.locals.query;
    const offers = await services.offers.paginate(page, limit, {order: order, where});
    res.status(200).json(offers);
  });

  router.get(`/:offerId`, async (req, res) => {
    const {offer} = res.locals;
    res.status(200).json(offer);
  });

  router.post(`/`, [authorize(services), validate(validators.offers.create, {}, {abortEarly: false})], async (req, res) => {
    const {currentUser} = res.locals;
    req.body.authorId = currentUser.id;
    const offer = await services.offers.create(req.body);
    res.status(201).json(offer);
  });

  router.put(`/:offerId`, [authorize(services), checkAuthor, validate(validators.offers.update, {}, {abortEarly: false})], async (req, res) => {
    const {offer} = res.locals;
    const updated = await services.offers.update(offer, req.body);
    res.status(200).json(updated);
  });

  router.delete(`/:offerId`, [authorize(services), checkAuthor], async (req, res) => {
    const {offer} = res.locals;
    const deleted = await services.offers.delete(offer);
    res.status(200).json(deleted);
  });

  router.get(`/:offerId/comments`, parseQuery, async (req, res) => {
    const {offer} = res.locals;
    const {page, limit} = req.query;
    const comments = await services.comments.paginate(offer, page, limit);
    if (!comments) {
      res.status(404).send(`Not found`);
      return;
    }
    res.status(200).json(comments);
  });

  router.delete(`/:offerId/comments/:commentId`, [authorize(services), checkAuthor], async (req, res) => {
    const {comment} = res.locals;
    const deleted = await services.comments.delete(comment);
    res.status(200).json(deleted);
  });

  router.put(`/:offerId/comments/:commentId`, [authorize(services), checkAuthor, validate(validators.comments.update, {}, {abortEarly: false})], async (req, res) => {
    const {comment} = res.locals;
    const updated = await services.comments.update(comment, req.body);
    res.status(200).json(updated);
  });

  router.post(`/:offerId/comments`, [authorize(services), validate(validators.comments.create, {}, {abortEarly: false})], async (req, res) => {
    const {offer, currentUser} = res.locals;
    req.body.authorId = currentUser.id;
    const created = await services.comments.create(offer, req.body);
    res.status(201).json(created);
  });

  router.get(`/category/:categoryId`, parseQuery, async (req, res) => {
    const {categoryId} = req.params;
    const {page, limit} = res.locals.query;

    const offers = await services.offers.findByCategory(page, limit, categoryId);
    if (!offers) {
      res.status(404).send(`Not found`);
      return;
    }

    res.status(200).json(offers);
  });

  router.get(`/author/:authorId`, parseQuery, async (req, res) => {
    const {author} = res.locals;
    const {page, limit} = res.locals.query;

    const offers = await services.offers.findByAuthor(page, limit, author.id);

    if (!offers) {
      res.status(404).send(`Not found`);
      return;
    }

    res.status(200).json(offers);
  });
};
