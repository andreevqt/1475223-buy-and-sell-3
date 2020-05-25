'use strict';
const pino = require(`pino`);
const formatDate = require(`./formatDate`);

let logger = pino({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`,
}, process.env.LOG_LEVEL === `debug`
  ? pino.destination(1)
  : pino.destination(`./src/service/logs/${formatDate(new Date())}.log`)
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
