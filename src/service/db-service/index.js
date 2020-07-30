'use strict';

const {Sequelize} = require(`sequelize`);
const config = require(`../../../config`);
const {logger} = require(`../../utils`).logger;

let database = null;

const init = () => {
  /* eslint-disable indent */
  database = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD, {
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    dialect: `postgres`,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  /* eslint-enable */

  logger.error(`Устанавливаем соединение с БД`);

  return database.authenticate()
    .then(() => logger.error(`Соединение с БД установлено`))
    .catch((err) => {
      logger.error(`Ошибка соединения с БД`);
      throw err;
    });
};

const sync = async () => {
  try {
    if (!database) {
      await init();
    }
    await database.sync({force: true});
  } catch (err) {
    logger.error(`Ошибка синзронизации БД`);
    throw err;
  } finally {
    database.close();
  }
  logger.error(`БД успешно синхронизирована`);

};

module.exports = {
  init,
  sync
};
