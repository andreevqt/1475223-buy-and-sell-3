'use strict';

const {UnknownCommandException} = require(`./exceptions`);

class ConsoleCommand {
  constructor() {
    this.commands = new Map();
  }

  add(name, cb) {
    this.commands.set(name, cb);
    return this;
  }

  async execute(name, args) {
    const command = this.commands.get(name);
    if (!command || typeof command !== `function`) {
      throw new UnknownCommandException(`Unknown command`);
    }
    return command(args);
  }
}

module.exports = ConsoleCommand;
