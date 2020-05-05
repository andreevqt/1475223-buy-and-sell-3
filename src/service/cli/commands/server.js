'use strict';

const express = require(`express`);
const {once} = require(`events`);
const chalk = require(`chalk`);
const api = require(`../../api`);

const app = express();
app.use(express.json());
app.use(`/api`, api);

const server = async (manager, args) => {
  const port = args[0] || 3000;

  return once(app.listen(port), `listening`)
    .then(() => console.log(chalk.green(`Ожидаю соединений на ${port}`)));
};

module.exports = server;
