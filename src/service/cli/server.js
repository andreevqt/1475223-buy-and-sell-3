'use strict';

const ConsoleCommand = require(`./ConsoleCommand`);
const generate = require(`./commands/generate`);
const version = require(`./commands/version`);
const help = require(`./commands/help`);

const command = process.argv[2];
const args = process.argv.slice(3);

const consoleCommand = new ConsoleCommand();
consoleCommand
  .add(`--generate`, generate)
  .add(`--version`, version)
  .add(`--help`, help)
  .execute(command, args)
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

