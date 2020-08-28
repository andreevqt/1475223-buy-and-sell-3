'use strict';

const ConsoleCommandManager = require(`./cli/ConsoleCommandManager`);
const {
  generate,
  version,
  help,
  server,
  fill,
  sync,
  filldb,
  secret
} = require(`./cli/commands`);
const chalk = require(`chalk`);

const command = process.argv[2];
const args = process.argv.slice(3);

/* eslint-disable */
const commandManager = new ConsoleCommandManager(
  `server`,
  `Программа запускает http-сервер и формирует файл с данными для API.`
);
/* eslint-enable */

commandManager
  .add(`--generate`, `формирует файл mocks.json`, generate, [`count`])
  .add(`--fill`, `генерирует файл fill-db.sql со сформированными запросами для создания n-объявлений`, fill, [`n`])
  .add(`--filldb`, `заполняет базу данных объявлениями`, filldb, [`n`])
  .add(`--version`, `выводит номер версии`, version)
  .add(`--help`, `печатает этот текст`, help)
  .add(`--server`, `запускает http-server`, server, [`port`])
  .add(`--sync`, `синхронизирует бд с моделями`, sync)
  .add(`--secret`, `генерирует secret key`, secret)
  .execute(command, args)
  .catch((err) => {
    console.log(chalk.red(`Ошибка!`));
    console.log(chalk.red(`message: ${err.message}, stack: ${err.stack}`));
    process.exit(1);
  });
