'use strict';

const config = require(`../../../config`);
const Offers = require(`./Offers`);
const Categories = require(`./Categories`);
const Search = require(`./Search`);
const Comments = require(`./Comments`);
const {API_PREFIX} = require(`../../service/constants`);

const url = `${config.app.url}:${config.server.port}${API_PREFIX}`;

const offers = new Offers(`${url}/offers`);
const categories = new Categories(`${url}/categories`);
const search = new Search(`${url}/search`);
const comments = new Comments(`${url}/offers`);

module.exports = {
  offers,
  categories,
  search,
  comments
};
