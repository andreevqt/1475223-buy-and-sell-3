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

let mocks = [];

const offerService = new OfferService(mocks);
const commentService = new CommentService(offerService);
const searchService = new SearchService(mocks);
const categoryService = new CategoryService(mocks);

const router = new Router();

offers(router, offerService, commentService);
search(router, searchService);
categories(router, categoryService);

const loadData = async () => {
  mocks = await getMocks();
  offerService.offers = mocks;
  categoryService.offers = mocks;
  searchService.offers = mocks;
};

module.exports = {
  router,
  offerService,
  commentService,
  searchService,
  categoryService,
  loadData
};
