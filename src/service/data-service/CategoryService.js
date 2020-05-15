'use strict';

class CategoryService {
  constructor(offers) {
    this.offers = offers;
  }

  findAll() {
    const categories = this.offers
      .reduce((acc, offer) => ([...acc, ...offer.category]), []);

    return [...new Set(categories)];
  }
}

module.exports = CategoryService;
