'use strict';

const db = require(`../../db-service`);

module.exports = async () => {
  await db.sync();
};
