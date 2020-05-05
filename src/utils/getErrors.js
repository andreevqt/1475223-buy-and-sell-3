'use strict';

module.exports = (errors) => errors.array().map(({msg, param}) => ({msg, param}));
