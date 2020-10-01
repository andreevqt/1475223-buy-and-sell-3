'use strict';

const Base = require(`./Base`);
const axios = require(`axios`);

class Offers extends Base {
  async fetchByCat({id, ...params}) {
    const url = `${this.url}/category/${id}`;
    return super.fetchData(url, params);
  }

  async fetchByAuthor({id, ...params}) {
    const url = `${this.url}/author/${id}`;
    return super.fetchData(url, params);
  }

  async addComment(offerId, comment) {
    return (await axios.post(`${this.url}/${offerId}/comments`, comment)).data;
  }
}

module.exports = Offers;
