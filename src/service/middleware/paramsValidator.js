'use strict';

const paramsValidator = (allowedKeys = []) => (req, res, next) => {
  const keys = Object.keys(req.body);
  const keysPresent = keys.every((key) => allowedKeys.includes(key));

  if (!keysPresent) {
    res.status(400).send(`Bad request`);
  }

  next();
};

module.exports = paramsValidator;
