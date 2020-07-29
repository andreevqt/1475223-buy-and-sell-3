'use strict';

const {Router} = require(`express`);
const {paramsValidator, parseQuery} = require(`../middleware`);

const router = new Router();

const offerValidator = paramsValidator([
  `category`,
  `description`,
  `picture`,
  `title`,
  `type`,
  `sum`,
  `authorId`
]);

const commentValidator = paramsValidator([
  `text`
]);

module.exports = (app, services) => {
  app.use(`/offers`, router);

  router.param(`offerId`, async (req, res, next) => {
    const {offerId} = req.params;
    const offer = await services.offers.findById(offerId);
    if (!offer) {
      res.status(404).send(`Not found`);
      return;
    }
    req.locals = req.locals || {};
    req.locals.offer = offer;
    next();
  });

  router.param(`commentId`, async (req, res, next) => {
    const {offer} = req.locals;
    const {commentId} = req.params;
    const comment = await services.comments.findOne({
      where: {
        id: commentId,
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

  router.get(`/`, parseQuery, async (req, res) => {
    const query = req.locals.parsed;
    const offers = await services.offers.find(query);
    res.status(200).json(offers);
  });

  router.get(`/:offerId`, async (req, res) => {
    const {offer} = req.locals;
    res.status(200).json(offer);
  });

  router.post(`/`, offerValidator, async (req, res) => {
    const offer = await services.offers.create(req.body);
    res.status(201).json(offer);
  });

  router.put(`/:offerId`, offerValidator, async (req, res) => {
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

  router.put(`/:offerId/comments/:commentId`, commentValidator, async (req, res) => {
    const {comment} = req.locals;
    const updated = await services.comments.update(comment, req.body);
    res.status(200).json(updated);
  });

  router.post(`/:offerId/comments`, commentValidator, async (req, res) => {
    const {offer} = req.locals;
    const created = await services.comments.create(offer, req.body);
    res.status(201).json(created);
  });

  router.get(`/category/:categoryId`, async (req, res) => {
    const {categoryId} = req.params;

    const offers = await services.offers.find({
      where: {
        '$category.id$': categoryId
      }
    });

    if (!offers) {
      res.status(404).send(`Not found`);
      return;
    }

    res.status(200).json(offers);
  });
};
