'use strict';

const {Router} = require(`express`);
const {parseQuery} = require(`../middleware`);
const {validate} = require(`express-validation`);
const validators = require(`../validators`);

const router = new Router();

module.exports = (app, services) => {
  app.use(`/users`, router);

  router.param(`userId`, async (req, res, next, id) => {
    if (!/^[0-9]+$/.test(id)) {
      res.status(400).send(`Id should be a number`);
      return;
    }

    const user = await services.users.findById(id);
    if (!user) {
      res.status(404).send(`Not found`);
      return;
    }

    req.locals = req.locals || {};
    req.locals.user = user;
    next();
  });

  router.get(`/`, parseQuery, async (req, res) => {
    const {page, limit} = req.locals.parsed;
    const users = await services.users.paginate(page, limit);
    res.status(200).json(users);
  });

  router.get(`/:userId`, async (req, res) => {
    const {user} = req.locals;
    res.status(200).send(user);
  });

  router.post(`/`, validate(validators.users.create, {}, {abortEarly: false}), async (req, res, next) => {
    let user;

    try {
      user = await services.users.create(req.body);
    } catch (err) {
      next(services.users.checkDuplicateEmail(err));
      return;
    }

    res.status(201).send(user);
  });

  router.put(`/:userId`, validate(validators.users.update, {}, {abortEarly: false}), async (req, res, next) => {
    const {user} = req.locals;
    let updated;

    try {
      updated = await services.users.update(user, req.body);
    } catch (err) {
      next(services.users.checkDuplicateEmail(err));
      return;
    }

    res.status(200).send(updated);
  });

  router.delete(`/:userId`, async (req, res) => {
    const {user} = req.locals;
    const deleted = await services.users.delete(user);
    res.status(200).send(deleted);
  });
};
