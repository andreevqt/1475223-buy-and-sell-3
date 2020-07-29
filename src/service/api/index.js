'use strict';

const {Router} = require(`express`);

const offers = require(`./offers`);
const search = require(`./search`);
const categories = require(`./categories`);
const {Offer, Category, User, Comment, service} = require(`../models`);

const {
  OfferService,
  CommentService,
  SearchService,
  CategoryService,
  UserService
} = require(`../data-service`);

const services = {};

services.users = new UserService(User, services);
services.categories = new CategoryService(Category, services);
services.offers = new OfferService(Offer, services);
services.comments = new CommentService(Comment, services);
services.search = new SearchService(null, services);

const router = new Router();

offers(router, services);
search(router, services);
categories(router, services);

module.exports = {
  router,
  services,
  db: service
};
