'use strict';

const {services, db} = require(`../api`);
const data = require(`./data`);

const setup = async () => {
  await db.auth();
  await db.drop();
  await db.sync();

  await services.categories.bulkCreate(data.categories.map((name) => ({name})));
  await services.users.bulkCreate(data.users);
};

module.exports = setup;
