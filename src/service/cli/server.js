'use strict';

const ConsoleCommand = require(`./ConsoleCommand`);
const generate = require(`./commands/generate`);
const { UnknownCommandException } = require("./exceptions");

const usage = () => console.log(`
  Программа запускает http-сервер и формирует файл с данными для API.

  Гайд:
  server <command>
  
  Команды:
  --version:            выводит номер версии
  --help:               печатает этот текст
  --generate <count>    формирует файл mocks.json
`);

if (process.argv.length < 3) {
  console.log("1");
  usage();
  process.exit(1);
}

const command = process.argv[2];
const args = process.argv.slice(3);
const consoleCommand = new ConsoleCommand();


consoleCommand
  .add("--generate", generate)
  .execute(command, args)
  .then(() => console.log("done"))
  .catch(err => {
    if (err instanceof UnknownCommandException) {
      usage();
    } else {
      console.log(err.message);
    }
    process.exit(1);
  });

