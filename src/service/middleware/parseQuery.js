'use strict';

const {convertQuery} = require(`../helpers`);

module.exports = (req, res, next) => {
  const {query} = req;
  res.locals.query = convertQuery(query);
  next();
};
