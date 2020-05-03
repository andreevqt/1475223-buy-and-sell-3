'use strict';

const packageJson = require(`../../../../package.json`);
const chalk = require(`chalk`);

const version = async (/* manager,  args */) => {
  console.log(chalk.blue(packageJson.version));
};

module.exports = version;
