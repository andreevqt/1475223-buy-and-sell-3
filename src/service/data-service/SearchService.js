'use strict';

const BaseService = require(`./BaseService`);

class SearchService extends BaseService {
  search(query = ``) {
    const regex = new RegExp(`^${query}`, `i`);
    return this._offers.filter((offer) => regex.test(offer.title));
  }
}

module.exports = SearchService;
