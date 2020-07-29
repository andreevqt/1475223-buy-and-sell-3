'use strict';

const BaseService = require(`./BaseService`);
const {Op} = require(`sequelize`);

class SearchService extends BaseService {
  search(query = ``) {
    return this._services.offers.find({
      where: {
        title: {
          [Op.iLike]: `%${query}%`
        }
      }
    });
  }
}

module.exports = SearchService;
