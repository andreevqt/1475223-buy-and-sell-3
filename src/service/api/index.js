'use strict';

const {Router} = require(`express`);

const offers = require(`./offers`);
const search = require(`./search`);
const categories = require(`./categories`);
const users = require(`./users`);
const {Offer, Category, User, Comment, service, RefreshToken} = require(`../models`);

const {
  OfferService,
  CommentService,
  SearchService,
  CategoryService,
  UserService,
  JWTService
} = require(`../data-service`);

const services = {};

services.users = new UserService(User, services);
services.categories = new CategoryService(Category, services);
services.offers = new OfferService(Offer, services);
services.comments = new CommentService(Comment, services);
services.search = new SearchService(null, services);
services.jwt = new JWTService(RefreshToken, services);

const router = new Router();

offers(router, services);
search(router, services);
categories(router, services);
users(router, services);

module.exports = {
  router,
  services,
  db: service
};
