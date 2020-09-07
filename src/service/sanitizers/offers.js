'use strict';

module.exports = {
  create: (req, res, next) => {
    req.body.sum = +req.body.sum;
    next();
  },
};
