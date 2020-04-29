'use strict';

class ConsoleCommandManager {
  constructor(name, description) {
    this.name = name
    this.description = description;
    this.commands = new Map();
  }

  add(name, description, cb) {
    this.commands.set(name, { description, cb });
    return this;
  }

  async execute(name, args) {
    const command = this.commands.get(name);

    if (!command) {
      throw new Error(`Неизвестная команда`);
    }

    return command.cb(this, args);
  }
}

module.exports = ConsoleCommandManager;
