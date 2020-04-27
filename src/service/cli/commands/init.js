'use strict';

const generate = require("./generate");
const consoleCommand = require("../ConsoleCommand");

module.exports = () => {
  consoleCommand.add("generate", generate);
}
