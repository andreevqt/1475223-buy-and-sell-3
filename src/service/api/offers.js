'use strict';

const {Router} = require(`express`);
const {parseQuery} = require(`../middleware`);
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

    req.locals = req.locals || {};
    req.locals.offer = offer;
    next();
  });

  router.param(`commentId`, async (req, res, next, id) => {
    if (!/^[0-9]+$/.test(id)) {
      res.status(400).send(`Id should be a number`);
      return;
    }

    const {offer} = req.locals;
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

    req.locals = req.locals || {};
    req.locals.comment = comment;
    next();
  });

  router.get(`/`, [validate(validators.offers.list), parseQuery], async (req, res) => {
    const {page, limit, ...rest} = req.locals.parsed;
    const offers = await services.offers.paginate(page, limit, rest);
    res.status(200).json(offers);
  });

  router.get(`/:offerId`, async (req, res) => {
    const {offer} = req.locals;
    res.status(200).json(offer);
  });

  router.post(`/`, validate(validators.offers.create, {}, {abortEarly: false}), async (req, res) => {
    const offer = await services.offers.create(req.body);
    res.status(201).json(offer);
  });

  router.put(`/:offerId`, validate(validators.offers.update, {}, {abortEarly: false}), async (req, res) => {
    const {offer} = req.locals;
    const updated = await services.offers.update(offer, req.body);
    res.status(200).json(updated);
  });

  router.delete(`/:offerId`, async (req, res) => {
    const {offer} = req.locals;
    const deleted = await services.offers.delete(offer);
    res.status(200).json(deleted);
  });

  router.get(`/:offerId/comments`, async (req, res) => {
    const {offer} = req.locals;
    const comments = await services.comments.findAll(offer);
    if (!comments) {
      res.status(404).send(`Not found`);
      return;
    }
    res.status(200).json(comments);
  });

  router.delete(`/:offerId/comments/:commentId`, async (req, res) => {
    const {comment} = req.locals;
    const deleted = await services.comments.delete(comment);
    res.status(200).json(deleted);
  });

  router.put(`/:offerId/comments/:commentId`, validate(validators.comments.update, {}, {abortEarly: false}), async (req, res) => {
    const {comment} = req.locals;
    const updated = await services.comments.update(comment, req.body);
    res.status(200).json(updated);
  });

  router.post(`/:offerId/comments`, validate(validators.comments.create, {}, {abortEarly: false}), async (req, res) => {
    const {offer} = req.locals;
    const created = await services.comments.create(offer, req.body);
    res.status(201).json(created);
  });

  router.get(`/category/:categoryId`, parseQuery, async (req, res) => {
    const {categoryId} = req.params;
    const {page, limit} = req.locals.parsed;

    const offers = await services.offers.findByCategory(page, limit, categoryId);

    if (!offers) {
      res.status(404).send(`Not found`);
      return;
    }

    res.status(200).json(offers);
  });
};
