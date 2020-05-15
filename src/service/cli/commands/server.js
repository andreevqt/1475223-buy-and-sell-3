'use strict';

const config = require(`../../../../config`);
const express = require(`express`);
const {once} = require(`events`);
const api = require(`../../api`);
const {logger} = require(`../../../utils`).logger;
const {logRequests} = require(`../../middleware`);
const {
  API_PREFIX
} = require(`../../constants`);

const server = async (manager, args) => {
  const port = args[0] || config.API_SERVER_PORT;

  const app = express();
  app.use(logRequests);

  // load data
  await api.loadData();

  app.use(API_PREFIX, (req, res, next) => {
    logger.error(`[ROUTE]: ${req.method} ${req.url}`);
    next();
  }, api.router);

  app.use((req, res) => res.status(404).send(`Not found`));
  app.use((err, req, res, _next) => {
    logger.info(`[ERROR]: ${err.stack}`);
    res.status(500).send(`Internal server error`);
  });

  return once(app.listen(port), `listening`)
    .then(() => logger.info(`[SERVER]: Ожидаю соединений на ${port}`))
    .catch((err) => {
      logger.info(`[ERROR]: ${err.msg}`);
    });
};

module.exports = server;
