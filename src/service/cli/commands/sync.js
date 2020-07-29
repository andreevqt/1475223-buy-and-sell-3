'use strict';

const {service} = require(`../../models`);

module.exports = async () => {
  await service.drop();
  await service.sync();
  await service.close();
};
