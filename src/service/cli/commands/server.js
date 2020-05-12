'use strict';

const express = require(`express`);
const {once} = require(`events`);
const chalk = require(`chalk`);
const api = require(`../../api`);
const {
  API_PREFIX,
  API_SERVER_DEFAULT_PORT
} = require(`../../constants`);

const server = async (manager, args) => {
  const port = args[0] || API_SERVER_DEFAULT_PORT;

  const app = express();

  app.use(express.json());
  app.use(API_PREFIX, await api());

  app.use((req, res) => res.status(404).send(`Not found`));

  return once(app.listen(port), `listening`)
    .then(() => console.log(chalk.green(`Ожидаю соединений на ${port}`)));
};

module.exports = server;
