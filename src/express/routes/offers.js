'use strict';

const {Router} = require(`express`);
const upload = require(`../middleware/upload`);
const axios = require(`axios`);
const {logger} = require(`../../utils`).logger;
const api = require(`../api-services`);

module.exports = (app) => {
  const router = new Router();
  const url = app.get(`api_url`);

  const types = [
    {label: `Куплю`, value: `buy`},
    {label: `Продам`, value: `sell`},
  ];

  router.get(`/add`, async (req, res) => {
    let categories = [];
    const formData = {category: [], type: `buy`};

    try {
      categories = await api.categories.fetch();
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/offers/ticket-add`, {formData, categories, types});
  });

  router.post(`/add`, upload.single(`picture`), async (req, res) => {
    const filename = req.file ? req.file.filename : undefined;
    const formData = {picture: filename, category: [], ...req.body};
    let categories = [];

    try {
      categories = await api.categories.fetch();
      await api.offers.create(formData);
    } catch (err) {
      const errors = err.response.data.body;
      res.render(`pages/offers/ticket-add`, {formData, categories, types, errors});
      return;
    }

    res.redirect(`/my`);
  });

  router.get(`/:id`, async (req, res) => {
    let offer;
    let comments;
    const {id} = req.params;

    try {
      offer = await api.offers.get(id);
      comments = await api.comments.fetch(id);
    } catch (err) {
      res.status(404).render(`errors/404`);
      return;
    }

    res.render(`pages/offers/ticket`, {offer, comments});
  });

  router.post(`/:id`, async (req, res) => {
    const {id} = req.params;
    const comment = req.body;

    try {
      await axios.post(`${url}/offers/${id}/comments`, comment);
    } catch (err) {
      res.status(404).render(`errors/404`);
      return;
    }

    res.redirect(`back`);
  });

  router.get(`/edit/:id`, async (req, res) => {
    const {id} = req.params;
    let formData;
    let categories;

    try {
      formData = await api.offers.get(id);
      categories = await api.categories.fetch();
    } catch (err) {
      res.status(404).render(`errors/404`);
      return;
    }

    res.render(`pages/offers/ticket-edit`, {formData, categories, types});
  });

  router.post(`/edit/:id`, upload.single(`picture`), async (req, res) => {
    const {id} = req.params;
    const filename = req.file ? req.file.filename : undefined;
    const formData = {picture: filename, category: [], ...req.body};
    let categories;

    try {
      categories = await api.categories.fetch();
      await api.offers.update(id, formData);
    } catch (err) {
      const errors = err.response.data.body;
      res.render(`pages/offers/ticket-edit`, {formData, categories, types, errors});
      return;
    }

    res.redirect(`/my`);
  });

  router.get(`/category/:id`, async (req, res) => {
    const {query, page, limit} = req.query;
    const {id} = req.params;
    let offers = [];
    let categories = [];
    let category;

    try {
      offers = await api.offers.fetchByCat({id, query, page, limit});
      categories = await api.categories.fetch();
      category = await api.categories.get(id);
    } catch (err) {
      res.status(404).render(`errors/404`);
      return;
    }


    res.render(`pages/category`, {offers, category, categories});
  });

  return router;
};
