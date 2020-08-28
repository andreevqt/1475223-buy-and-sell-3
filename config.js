'use strict';

require(`dotenv`).config();

module.exports = {
  env: process.env.NODE_ENV || `development`,
  jwt: {
    secret: {
      access: process.env.JWT_SECRET_ACCESS,
      refresh: process.env.JWT_SECRET_REFRESH
    },
    expiresIn: process.env.JWT_EXPIRES_IN || `15m`
  },
  app: {
    key: process.env.APP_KEY,
    url: process.env.APP_URL || `http://localhost`,
    port: process.env.APP_PORT || 8080,
    public: process.env.APP_PUBLIC_FOLDER || `public`
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  db: {
    development: {
      username: process.env.DB_USER_DEVELOPMENT || process.env.DB_USER,
      password: process.env.DB_PASSWORD_DEVELOPMENT || process.env.DB_PASSWORD,
      database: process.env.DB_NAME_DEVELOPMENT || process.env.DB_NAME,
      host: process.env.DB_HOST_DEVELOPMENT || process.env.DB_HOST || `localhost`,
      dialect: `postgres`
    },
    test: {
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      database: process.env.DB_NAME_TEST,
      host: process.env.DB_HOST_TEST || `localhost`,
      dialect: `postgres`
    },
    production: {
      username: process.env.DB_USER_PRODUCTION,
      password: process.env.DB_PASSWORD_PRODUCTION,
      database: process.env.DB_NAME_PRODUCTION,
      host: process.env.DB_HOST_PRODUCTION || `localhost`,
      dialect: `postgres`
    },
  },
};
