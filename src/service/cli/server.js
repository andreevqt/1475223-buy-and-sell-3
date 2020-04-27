'use strict';

const commandRegistry = require(`./CommandRegistry`);
const initCommands = require("./commands/init");

const usage = () => console.log(`
  Программа запускает http-сервер и формирует файл с данными для API.

  Гайд:
  server <command>
  
  Команды:
  --version:            выводит номер версии
  --help:               печатает этот текст
  --generate <count>    формирует файл mocks.json
`);

const getCommand = () => process.argv[2] && process.argv[2].slice(2);
const getArgs = () => process.argv[3];

initCommands();

const command = getCommand();
const args = getArgs();

if (!commandRegistry.execute(command, args)) {
  usage();
  return;
}

