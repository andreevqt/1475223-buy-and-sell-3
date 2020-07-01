'use strict';

module.exports = (items, limit = 4) => {
  return items.sort((a, b) => a.comments.length < b.comments.length)
    .splice(0, limit);
};
