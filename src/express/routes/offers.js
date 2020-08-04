'use strict';

const {Router} = require(`express`);
const upload = require(`../middleware/upload`);
const axios = require(`axios`);
const {logger} = require(`../../utils`).logger;

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
      categories = (await axios.get(`${url}/categories`)).data;
    } catch (err) {
      logger.error(`[ERROR] route: ${req.url}, message: status - ${err.response.status}, data - ${err.response.data}`);
    }

    res.render(`pages/offers/ticket-add`, {formData, categories, types});
  });

  router.post(`/add`, upload.single(`picture`), async (req, res) => {
    const filename = req.file ? req.file.filename : null;
    const formData = {picture: filename, category: [], ...req.body};
    let categories = [];

    try {
      categories = (await axios.get(`${url}/categories`)).data;
      await axios.post(`${url}/offers`, formData);
    } catch (err) {
      res.render(`pages/offers/ticket-add`, {formData, categories, types});
      return;
    }

    res.redirect(`/my`);
  });

  router.get(`/:id`, async (req, res) => {
    let offer;
    let comments;
    const {id} = req.params;

    try {
      offer = (await axios.get(`${url}/offers/${id}`)).data;
      comments = (await axios.get(`${url}/offers/${id}/comments`)).data;
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
    let formData = null;
    let categories = null;

    try {
      formData = (await axios.get(`${url}/offers/${id}`)).data;
      categories = (await axios.get(`${url}/categories`)).data;
    } catch (err) {
      res.status(404).render(`errors/404`);
      return;
    }

    res.render(`pages/offers/ticket-edit`, {formData, categories, types});
  });

  router.post(`/edit/:id`, upload.single(`picture`), async (req, res) => {
    const {id} = req.params;
    const filename = req.file ? req.file.filename : null;
    const formData = {picture: filename, category: [], ...req.body};

    try {
      await axios.put(`${url}/offers/${id}`, formData);
    } catch (err) {
      res.status(404).render(`errors/404`);
      return;
    }

    res.redirect(`/my`);
  });

  router.get(`/category/:id`, async (req, res) => {
    const {id} = req.params;
    let offers = [];
    let categories = [];
    let category;

    try {
      offers = (await axios.get(`${url}/offers/category/${id}`)).data;
      categories = (await axios.get(`${url}/categories`)).data;
      category = (await axios.get(`${url}/categories/${id}`)).data;
      console.log(category.name);
    } catch (err) {
      res.status(404).render(`errors/404`);
      return;
    }

    res.render(`pages/category`, {offers, category, categories});
  });

  return router;
};
