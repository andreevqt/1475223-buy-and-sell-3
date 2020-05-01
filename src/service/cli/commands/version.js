'use strict';

const packageJson = require(`../../../../package.json`);
const chalk = require(`chalk`);

const version = async (/* manager,  args */) => {
  console.log(chalk.green(packageJson.version));
};

module.exports = version;
