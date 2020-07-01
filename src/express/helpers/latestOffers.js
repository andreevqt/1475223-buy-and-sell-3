'use strict';

module.exports = (items, limit = 8) => {
  return items.reverse().splice(0, limit);
};
