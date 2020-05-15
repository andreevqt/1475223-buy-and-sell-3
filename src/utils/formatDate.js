'use strict';

const pad = require(`./pad`);

const formatDate = (date) => {
  const year = pad(date.getFullYear(), 4);
  const month = pad(date.getMonth(), 2);
  const hour = pad(date.getHours(), 2);
  const minutes = pad(date.getMinutes(), 2);
  const seconds = pad(date.getSeconds(), 2);

  return `${year}-${month}-${hour}-${minutes}-${seconds}`;
};

module.exports = formatDate;
