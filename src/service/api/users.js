'use strict';

const {Router} = require(`express`);
const {parseQuery, auth, isCurrentUser} = require(`../middleware`);
const {validate} = require(`express-validation`);
const validators = require(`../validators`);
const authorize = require(`../middleware/authorize`);

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

    res.locals.user = user;
    next();
  });

  router.get(`/`, parseQuery, async (req, res) => {
    const {page, limit} = res.locals.query;
    const users = await services.users.paginate(page, limit);
    res.status(200).json(users);
  });

  router.get(`/:userId`, async (req, res) => {
    const {user} = res.locals;
    res.status(200).send(user);
  });

  router.post(`/`, validate(validators.users.create, {}, {abortEarly: false}), async (req, res, next) => {
    try {
      const user = await services.users.register(req.body);
      res.status(201).send(user);
    } catch (err) {
      next(services.users.checkDuplicateEmail(err));
    }
  });

  router.put(`/:userId`, [authorize(services), isCurrentUser, validate(validators.users.update, {}, {abortEarly: false})], async (req, res, next) => {
    try {
      const {user} = res.locals;
      const updated = await services.users.update(user, req.body);
      res.status(200).send(updated);
    } catch (err) {
      next(services.users.checkDuplicateEmail(err));
    }
  });

  router.delete(`/logout`, authorize(services), async (req, res) => {
    const {token} = req.body;
    if (!token) {
      res.sendStatus(400);
      return;
    }

    await services.users.logout(token);
    res.status(204).send(`No Content`);
  });

  router.delete(`/:userId`, [authorize(services), isCurrentUser], async (req, res) => {
    const {user} = res.locals;
    const deleted = await services.users.delete(user);
    res.status(200).send(deleted);
  });

  router.post(`/login`, auth(services), async (_req, res) => {
    const {user} = res.locals;
    res.status(200).json(user);
  });

  router.post(`/refresh`, async (req, res) => {
    const {token} = req.body;
    if (!token) {
      res.status(400).send(`Bad request`);
      return;
    }

    try {
      const {userId, email} = await services.jwt.verifyRefresh(token);
      await services.jwt.drop(email, token);

      const user = await services.users.findById(userId);
      if (!user) {
        res.status(401).send(`Not authorized`);
        return;
      }

      const tokens = await services.jwt.generateTokens(user);
      res.status(200).json(tokens);
    } catch (err) {
      res.status(403).send(`Forbidden`);
    }
  });

  router.post(`/reset-password`, [authorize(services), validate(validators.users.resetPassword, {}, {abortEarly: false})], async (req, res) => {
    const {currentUser} = res.locals;
    const {newPassword, oldPassword} = req.body;
    let errors;

    if (!services.users.checkPassword(currentUser, oldPassword)) {
      errors = {oldPassword: `Неверный пароль`};
      res.status(400).json(errors);
      return;
    }

    if (services.users.checkPassword(currentUser, newPassword)) {
      errors = {newPassword: `Пароль уже использовался`};
      res.status(400).json(errors);
      return;
    }

    await services.users.update(currentUser, {password: newPassword});
    res.sendStatus(200);
  });
};
