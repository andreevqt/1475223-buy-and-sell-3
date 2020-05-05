'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LEN} = require(`../constants`);

class OfferService {
  constructor(offers) {
    this.offers = offers;
  }

  find(cb) {
    return this.offers.filter(cb);
  }

  findAll() {
    return this.offers;
  }

  findOne(id) {
    return this.offers.find((offer) => offer.id === id);
  }

  create(attrs) {
    const newOffer = {id: nanoid(ID_LEN), comments: [], ...attrs};
    this.offers = [
      ...this.offers,
      newOffer
    ];
    return newOffer;
  }

  delete(id) {
    const deleted = this.offers.find((offer) => offer.id === id);

    if (!deleted) {
      return null;
    }

    this.offers = this.offers.filter((offer) => offer.id !== id);
    return deleted;
  }

  update(offerId, attrs) {
    /* eslint-disable no-unused-vars */
    // omit id
    const {id, ...rest} = attrs;
    /* eslint-enable */

    let updated = null;
    this.offers = this.offers.map((offer) => {
      if (offer.id === offerId) {
        updated = {...offer, ...rest};
        return updated;
      }
      return offer;
    });

    return updated;
  }
}

module.exports = OfferService;
