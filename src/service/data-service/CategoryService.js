'use strict';

const BaseService = require(`./BaseService`);

class CategoryService extends BaseService {
  findAll() {
    const categories = this._offers
      .reduce((acc, offer) => ([...acc, ...offer.category]), []);

    return [...new Set(categories)];
  }
}

module.exports = CategoryService;
