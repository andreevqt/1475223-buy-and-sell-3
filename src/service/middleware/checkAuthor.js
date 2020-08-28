'use strict';

module.exports = (_req, res, next) => {
  const {currentUser} = res.locals;
  const model = res.locals.offer || res.locals.comment;
  if (model.author.id !== currentUser.id) {
    res.status(403).send(`Forbidden`);
    return;
  }

  next();
};
