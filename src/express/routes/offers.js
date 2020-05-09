'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/add`, (_req, res, _next) => res.send(`/offers/add`));
router.get(`/:id`, (_req, res, _next) => res.send(`/offers/:id`));
router.get(`/edit/:id`, (_req, res, _next) => res.send(`/offers/edit/:id`));
router.get(`/category/:id`, (_req, res, _next) => res.send(`/offers/category/:id`));

module.exports = router;
