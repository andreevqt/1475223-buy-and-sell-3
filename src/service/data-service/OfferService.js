'use strict';

const BaseService = require(`./BaseService`);
const imageService = require(`../image-service`);

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

    if (attrsCopy.picture) {
      attrsCopy.picture = await imageService.makeThumbnail(attrsCopy.picture, 241, 299);
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

    if (attrs.picture) {
      await imageService.removeThumbnail(offer.picture.small);
      attrs.picture = await imageService.makeThumbnail(attrs.picture);
    }

    await offer.update(attrs);

    if (categories) {
      await offer.setCategory(categories);
    }

    return offer.reload();
  }

  async findByCategory(page, limit, categoryId) {
    return this._model.findByCategory(page, limit, categoryId);
  }

  async findByAuthor(page, limit, authorId) {
    return this.paginate(page, limit, {where: {authorId}});
  }
}

module.exports = OfferService;
