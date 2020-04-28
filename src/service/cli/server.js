'use strict';

const ConsoleCommand = require(`./ConsoleCommand`);
const generate = require(`./commands/generate`);
const version = require(`./commands/version`);
const {UnknownCommandException} = require(`./exceptions`);

const usage = () => console.log(`
  Программа запускает http-сервер и формирует файл с данными для API.

  Гайд:
  server <command>
  
  Команды:
  --version:            выводит номер версии
  --help:               печатает этот текст
  --generate <count>    формирует файл mocks.json
`);

const command = process.argv[2];
const args = process.argv.slice(3);

const consoleCommand = new ConsoleCommand();
consoleCommand
  .add(`--generate`, generate)
  .add(`--version`, version)
  .execute(command, args)
  .catch((err) => {
    if (err instanceof UnknownCommandException) {
      usage();
    } else {
      console.log(err.message);
    }
    process.exit(1);
  });

