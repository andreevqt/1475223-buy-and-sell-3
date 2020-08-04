'use strict';

const {
  Model
} = require(`sequelize`);

class BaseModel extends Model {
  reload() {
    return super.reload(this.constructor.getQueryOptions());
  }
  /*
   * Требуется для тестов т.к метод toJSON
   * не преобразует дату в строку
   */
  convertToJSON() {
    return JSON.parse(JSON.stringify(this.toJSON()));
  }

  static getQueryOptions() {
    return {};
  }
}

module.exports = BaseModel;
