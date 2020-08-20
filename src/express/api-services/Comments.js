'use strict';

const axios = require(`axios`);
const Base = require(`./Base`);

class Comments extends Base {
  async fetch(offerId, params) {
    return (await axios.get(`${this.url}/${offerId}/comments`, {params})).data;
  }

  async create(offerId, attrs) {
    return (await axios.post(`${this.url}/${offerId}/comments`, attrs)).data;
  }
}

module.exports = Comments;
