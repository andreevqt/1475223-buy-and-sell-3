'use strict';

const { singleton } = require("../../utils");

class ConsoleCommand {
  constructor() {
    this.commands = new Map();
  }

  add(name, cb) {
    this.commands.set(name, cb);
  }

  execute(name, args) {
    const command = this.commands.get(name);
    if (!command || typeof command !== "function") {
      return false;
    }

    return command(args);
  }
}

module.exports = singleton(ConsoleCommand).getInstance();
