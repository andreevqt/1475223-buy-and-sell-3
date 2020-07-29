'use strict';

const BaseService = require(`./BaseService`);

class OfferService extends BaseService {
  async getCategory(ids) {
    return this._services.categories.find({
      where: {
        id: ids
      }
    });
  }

  async create(attrs) {
    const attrsCopy = {...attrs};
    if (!Array.isArray(attrsCopy.category)) {
      attrsCopy.category = [attrsCopy.category];
    }

    if (!attrsCopy.authorId) {
      attrsCopy.authorId = (await this._services.users.random()).id;
    }

    const categories = await this.getCategory(attrsCopy.category);
    if (!categories.length) {
      return null;
    }

    const offer = await this._model.create(attrsCopy);
    await offer.setCategory(categories);

    return offer.reload();
  }

  async update(offer, attrs) {
    let categories;
    if (attrs.category) {
      categories = await this.getCategory(attrs.category);
    }

    if (!attrs.picture) {
      delete attrs.picture;
    }

    await offer.update(attrs);

    if (categories) {
      await offer.setCategory(categories);
    }

    return offer.reload();
  }
}

module.exports = OfferService;
