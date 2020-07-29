'use strict';

const {db} = require(`../api`);

const teardown = async () => {
  await db.close();
};

module.exports = teardown;
