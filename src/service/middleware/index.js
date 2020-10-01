'use strict';

module.exports = {
  parseQuery: require(`./parseQuery`),
  paramsValidator: require(`./paramsValidator`),
  logRequests: require(`./logRequests`),
  auth: require(`./auth`),
  authorize: require(`./authorize`),
  checkAuthor: require(`./checkAuthor`),
  isCurrentUser: require(`./isCurrentUser`)
};
