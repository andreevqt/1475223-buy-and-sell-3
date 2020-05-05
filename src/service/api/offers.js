'use strict';

const {Router} = require(`express`);
const {paramsValidator} = require(`../middleware`);

const router = new Router();
const offerValidator = paramsValidator([
  `type`,
  `title`,
  `description`,
  `picture`,
  `sum`,
  `category`
]);
const commentValidator = paramsValidator([
  `text`
]);

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, router);

  router.get(`/`, (_req, res) => {
    const offers = offerService.findAll();
    res.status(200).json(offers);
  });

  router.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);
    if (!offer) {
      res.status(404).send(`Not found`);
    }
    res.status(200).json(offer);
  });

  router.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);
    res.status(201).json(offer);
  });

  router.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const offer = req.body;

    const isExists = offerService.findOne(offerId);
    if (!isExists) {
      res.status(404).send(`Not found`);
    }

    const updated = offerService.update(offerId, offer);
    res.status(200).json(updated);
  });

  router.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;

    const offer = offerService.findOne(offerId);
    if (!offer) {
      res.status(404).send(`Not found`);
    }

    offerService.delete(offerId);
    res.status(200).json(offer);
  });

  router.get(`/:offerId/comments`, (req, res) => {
    const {offerId} = req.params;
    const comments = commentService.findAll(offerId);
    if (!comments) {
      res.status(404).send(`Not found`);
    }

    res.status(200).json(comments);
  });

  router.delete(`/:offerId/comments/:commentId`, (req, res) => {
    const {offerId, commentId} = req.params;
    const deleted = commentService.delete(offerId, commentId);

    if (!deleted) {
      return res.status(404).send(`Not found`);
    }

    return res.status(200).json(deleted);
  });

  router.put(`/:offerId/comments/:commentId`, commentValidator, (req, res) => {
    const {offerId, commentId} = req.params;
    const comment = req.body;

    const updated = commentService.update(offerId, commentId, comment);
    if (!updated) {
      return res.status(404).send(`Not found`);
    }

    return res.status(200).send(updated);
  });

  router.post(`/:offerId/comments`, commentValidator, (req, res) => {
    const {offerId} = req.params;
    const comment = req.body;

    const created = commentService.create(offerId, comment);
    if (!created) {
      return res.status(404).send(`Not found`);
    }

    return res.status(201).send(created);
  });
};
