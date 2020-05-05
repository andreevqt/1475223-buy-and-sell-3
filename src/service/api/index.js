'use strict';

const fs = require(`fs`).promises;
const {Router} = require(`express`);
const {
  OfferService,
  CommentService,
  SearchService,
  CategoryService
} = require(`../data-service`);
const offers = require(`./offers`);
const search = require(`./search`);
const categories = require(`./categories`);

const app = new Router();

(async () => {
  let mocks = JSON.parse(await fs.readFile(`${process.cwd()}/mocks.json`));

  const offerService = new OfferService(mocks);
  const commentService = new CommentService(offerService);
  const searchService = new SearchService(mocks);
  const categoryService = new CategoryService(mocks);

  offers(app, offerService, commentService);
  search(app, searchService);
  categories(app, categoryService);
})();

module.exports = app;
