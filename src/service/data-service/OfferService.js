'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LEN} = require(`../constants`);
const BaseService = require(`./BaseService`);

class OfferService extends BaseService {
  find(cb) {
    return this._offers.filter(cb);
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((offer) => offer.id === id);
  }

  create(attrs) {
    const newOffer = {id: nanoid(ID_LEN), comments: [], ...attrs};
    this._offers = [
      ...this._offers,
      newOffer
    ];
    return newOffer;
  }

  delete(id) {
    const deleted = this._offers.find((offer) => offer.id === id);

    if (!deleted) {
      return null;
    }

    this._offers = this._offers.filter((offer) => offer.id !== id);
    return deleted;
  }

  update(offerId, attrs) {
    let updated = null;
    this._offers = this._offers.map((offer) => {
      if (offer.id === offerId) {
        updated = {...offer, ...attrs};
        return updated;
      }
      return offer;
    });

    return updated;
  }
}

module.exports = OfferService;
