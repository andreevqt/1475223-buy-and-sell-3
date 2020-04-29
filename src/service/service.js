'use strict';

const ConsoleCommand = require(`./cli/ConsoleCommand`);
const {
  generate,
  version,
  help
} = require(`./cli/commands`);

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

