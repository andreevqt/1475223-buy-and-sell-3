'use strict';

const {Router} = require(`express`);
const {getMocks} = require(`../../utils`);

const offers = require(`./offers`);
const search = require(`./search`);
const categories = require(`./categories`);

const {
  OfferService,
  CommentService,
  SearchService,
  CategoryService
} = require(`../data-service`);

module.exports = async () => {
  let mocks = await getMocks();

  const offerService = new OfferService(mocks);
  const commentService = new CommentService(offerService);
  const searchService = new SearchService(mocks);
  const categoryService = new CategoryService(mocks);

  const app = new Router();

  offers(app, offerService, commentService);
  search(app, searchService);
  categories(app, categoryService);

  return app;
};
