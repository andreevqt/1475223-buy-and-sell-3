'use strict';

const ConsoleCommandManager = require(`./cli/ConsoleCommandManager`);
const {
  generate,
  version,
  help
} = require(`./cli/commands`);

const command = process.argv[2];
const args = process.argv.slice(3);

/* eslint-disable */
const commandManager = new ConsoleCommandManager(
  `server`,
  `Программа запускает http-сервер и формирует файл с данными для API.`
);
/* eslint-enable */

commandManager
  .add(`--generate`, `выводит номер версии`, generate, [`count`])
  .add(`--version`, `печатает этот текст`, version)
  .add(`--help`, `формирует файл mocks.json`, help)
  .execute(command, args)
  .catch((err) => {
    process.exit(1);
  });
