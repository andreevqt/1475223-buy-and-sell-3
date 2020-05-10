'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/add`, (_req, res, _next) => res.render(`pages/offers/ticket-add`));
router.get(`/:id`, (_req, res, _next) => res.render(`pages/offers/ticket`));
router.get(`/edit/:id`, (_req, res, _next) => res.render(`pages/offers/ticket-edit`));
router.get(`/category/:id`, (_req, res, _next) => res.render(`pages/category`));

module.exports = router;
