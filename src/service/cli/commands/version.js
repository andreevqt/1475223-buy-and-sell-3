'use strict';

const packageJson = require(`../../../../package.json`);

const version = (/* args */) => {
  const ver = packageJson.version;
  return new Promise((resolve/* , reject */) => {
    console.log(ver);
    resolve();
  });
};

module.exports = version;
