'use strict';

class BaseService {
  constructor(offers) {
    this._offers = offers;
  }

  set offers(offers) {
    this._offers = offers;
  }

  get offers() {
    return this._offers;
  }

  clear() {
    this._offers = [];
  }
}

module.exports = BaseService;
