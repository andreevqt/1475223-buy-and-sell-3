'use strict';

const BaseService = require(`./BaseService`);

class CategoryService extends BaseService {
  getCategories() {
    const categories = this._offers
      .reduce((acc, offer) => ([...acc, ...offer.category]), []);

    return [...new Set(categories)];
  }

  findAll() {
    return this.getCategories();
  }

  findOne(id) {
    const categories = this.getCategories();
    return categories.find((offer, idx) => idx === id);
  }
}

module.exports = CategoryService;
