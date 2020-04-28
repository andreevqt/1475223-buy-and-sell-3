'use strict';

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
      throw new Error(`Неизвестная команда`);
    }
    return command(args);
  }
}

module.exports = ConsoleCommand;
