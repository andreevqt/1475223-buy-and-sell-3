'use strict';

const axios = require(`axios`);
const {Collection} = require(`../helpers`);

class Base {
  constructor(url) {
    this.url = url;
  }

  async fetch(params) {
    return this.fetchData(this.url, params);
  }

  async fetchData(url, params) {
    let items = {
      items: [],
      currentPage: 1,
      totalPages: 1,
      total: 0
    };

    try {
      items = (await axios.get(url, {params})).data;
    } catch (err) {
      if (!(err.response && err.response.status === 404)) {
        throw err;
      }
    }

    return new Collection(items, items.totalPages, items.currentPage);
  }

  async create(attrs) {
    let result;
    let errors;

    try {
      result = (await axios.post(this.url, attrs)).data;
    } catch (err) {
      if (!(err.response && err.response.status === 400)) {
        throw err;
      }

      errors = err.response.data.body;
    }

    return {
      result,
      errors
    };
  }

  async update(id, attrs) {
    let result;
    let errors;

    try {
      result = (await axios.put(`${this.url}/${id}`, attrs)).data;
    } catch (err) {
      if (!(err.response && err.response.status === 400)) {
        throw err;
      }

      errors = err.response.data.body;
    }

    return {
      result,
      errors
    };
  }

  async delete(id) {
    return (await axios.delete(`${this.url}/${id}`)).data;
  }

  async get(id) {
    let item;

    try {
      item = (await axios.get(`${this.url}/${id}`)).data;
    } catch (err) {
      if (!(err.response && err.response.status === 404)) {
        throw err;
      }
    }

    return item;
  }
}

module.exports = Base;
