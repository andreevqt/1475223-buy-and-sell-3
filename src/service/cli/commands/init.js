'use strict';

const generate = require("./generate");
const commandRegistry = require("../CommandRegistry");

module.exports = () => {
  commandRegistry.add("generate", generate);
}
