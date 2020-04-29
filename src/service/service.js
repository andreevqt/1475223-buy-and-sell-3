'use strict';

const ConsoleCommandManager = require(`./cli/ConsoleCommandManager`);
const {
  generate,
  version,
  help
} = require(`./cli/commands`);

const command = process.argv[2];
const args = process.argv.slice(3);

const commandManager = new ConsoleCommandManager(
  `server`,
  `Программа запускает http-сервер и формирует файл с данными для API.`
);

commandManager
  .add(`--generate`, `выводит номер версии`, generate)
  .add(`--version`, `печатает этот текст`, version)
  .add(`--help`, `формирует файл mocks.json`, help)
  .execute(command, args)
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

