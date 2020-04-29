'use strict';

const help = async (commandsManager, /* args */) => {

  let out = `    ${commandsManager.description}\n\n`;
  out += `    Гайд:\n`
  out += `    ${commandsManager.name} <command>\n\n`;
  out += `    Команды:\n`;
  commandsManager.commands.forEach(({ description }, name) => {
    out += `    ${name}:    ${description}\n`;
  })
};

module.exports = help;
