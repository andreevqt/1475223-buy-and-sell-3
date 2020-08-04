'use strict';

const BaseService = require(`./BaseService`);

class CommentService extends BaseService {
  findAll(offer) {
    return this._model.findAll({
      ...this._model.getQueryOptions(),
      where: {
        offerId: offer.id
      }
    });
  }

  async create(offer, attrs) {
    const offerId = typeof offer === `object` ? offer.id : offer;

    const user = await this._services.users.random();
    attrs.authorId = user.id;
    attrs.offerId = offerId;

    const comment = await this._model.create(attrs);
    await comment.reload();

    return comment;
  }

  async update(comment, attrs) {
    await comment.update({text: attrs.text});
    return comment.reload();
  }
}

module.exports = CommentService;
