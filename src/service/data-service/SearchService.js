'use strict';

class SearchService {
  constructor(offers) {
    this.offers = offers;
  }

  search(query = ``) {
    const regex = new RegExp(`^${query}`);
    return this.offers.filter((offer) => regex.test(offer.title));
  }
}

module.exports = SearchService;
