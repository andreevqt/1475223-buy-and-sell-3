'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LEN} = require(`../constants`);

class CommentService {
  constructor(offerService) {
    this.offerService = offerService;
  }

  findAll(offerId) {
    const offer = this.offerService.findOne(offerId);
    if (!offer) {
      return null;
    }

    return offer.comments;
  }

  create(offerId, text) {
    const offer = this.offerService.findOne(offerId);
    if (!offer) {
      return null;
    }

    const comment = {id: nanoid(ID_LEN), text};
    offer.comments = [...offer.comments, comment];

    this.offerService.update(offerId, offer);
    return comment;
  }

  delete(offerId, commentId) {
    const offer = this.offerService.findOne(offerId);
    if (!offer) {
      return null;
    }

    let deleted = null;

    offer.comments = offer.comments.filter((comment) => {
      if (comment.id === commentId) {
        deleted = comment;
        return false;
      }
      return true;
    });

    this.offerService.update(offerId, offer);
    return deleted;
  }

  update(offerId, commentId, attrs) {
    /* eslint-disable no-unused-vars */
    // omit
    const {id, ...rest} = attrs;
    /* eslint-enable */

    const offer = this.offerService.findOne(offerId);
    if (!offer) {
      return null;
    }

    let updated = null;
    offer.comments = offer.comments.map((comment) => {
      if (comment.id === commentId) {
        updated = {...comment, ...rest};
        return updated;
      }

      return comment;
    });

    return updated;
  }
}

module.exports = CommentService;
