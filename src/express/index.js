'use strict';

const config = require(`../../config`);
const express = require(`express`);
const path = require(`path`);
const {API_PREFIX} = require(`../service/constants`);
const {once} = require(`events`);
const {logger} = require(`../utils`).logger;
const {
  main,
  offers,
  my
} = require(`./routes`);
const cookieParser = require(`cookie-parser`);
const checkAuth = require(`./middleware/checkAuth`);
const auth = require(`./middleware/auth`);

const app = express();

const apiUrl = `${config.app.url}:${config.server.port}${API_PREFIX}`;

app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser(config.app.key));


app.use((req, res, next) => {
  res.locals.meta = {};
  res.locals.meta = {apiUrl};
  res.locals.path = req.path;
  next();
});

// routes
app.use(`/`, auth, main(app));
app.use(`/my`, [auth, checkAuth], my(app));
app.use(`/offers`, auth, offers(app));

app.use(express.static(path.resolve(__dirname, config.app.public)));

app.use((req, res, _next) => {
  logger.info(`[ERROR]: status - 404, url: ${req.url}`);
  res.status(404).render(`errors/404`);
});

app.use((err, req, res, _next) => {
  if (err.response) {
    logger.error(`[ERROR] route: ${req.url}, status: ${err.response.status}, message: ${err.response.data}`);
  } else {
    logger.info(`[ERROR] route: ${req.url}, message: ${err.message}, stack: ${err.stack}`);
  }

  if (err.status === 403) {
    res.render(`errors/403`);
    return;
  }

  res.status(500).render(`errors/500`);
});

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

once(app.listen(config.app.port), `listening`)
  .then(() => logger.info(`Ожидаю соединений на  ${config.app.port}`));
