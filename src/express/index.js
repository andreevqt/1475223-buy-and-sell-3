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

const app = express();

app.set(`app_url`, `${config.APP_URL}:${config.APP_PORT}`);
app.set(`api_url`, `${config.APP_URL}:${config.API_SERVER_PORT}${API_PREFIX}`);
app.set(`logger`, logger);

app.use(express.urlencoded({
  extended: true
}));
// routes
app.use(`/`, main(app));
app.use(`/my`, my(app));
app.use(`/offers`, offers(app));

app.use(express.static(path.resolve(__dirname, config.APP_PUBLIC_FOLDER)));

app.use((req, res, _next) => {
  logger.info(`[ERROR]: status - 404, url: ${req.url}`);
  res.status(404).render(`errors/404`);
});

app.use((err, req, res, _next) => {
  logger.info(`[ERROR]: status - 500, url: ${req.url}, msg: ${err.message}`);
  res.status(500).render(`errors/500`);
});

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

once(app.listen(config.APP_PORT), `listening`)
  .then(() => logger.info(`Ожидаю соединений на  ${config.APP_PORT}`));
