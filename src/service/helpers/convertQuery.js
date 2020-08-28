'use strict';

/* eslint-disable no-unused-vars */

const Sequelize = require(`sequelize`);

const operators = {
  lt: (value) => {
    return {
      op: `$lt`,
      value
    };
  },
  gt: (value) => {
    return {
      op: `$gt`,
      value
    };
  },
  and: (value) => {
    return {
      op: `$and`,
      value: value.split(`,`)
    };
  }
};

const pick = (data) => {
  for (const key in data) {
    if (!data[key]) {
      delete data[key];
    }
  }
  return data;
};

const parseOrder = (order) => {
  if (order === `popular`) {
    return [[Sequelize.literal(`"commentsCount"`), `desc`]];
  }

  if (order === `asc`) {
    return [[`createdAt`, `asc`]];
  }

  if (order === `desc`) {
    return [[`createdAt`, `desc`]];
  }

  // default desc
  return [[`createdAt`, `desc`]];
};

const parseWhere = (query) => {
  const {order, page, limit, ...properties} = query;
  if (!Object.keys(properties).length) {
    return null;
  }

  const where = {};

  for (const property in properties) {
    if (properties.hasOwnProperty(property)) {
      if (properties[property].includes(`:`)) {
        const [op, value] = properties[property].split(`:`);
        if (op in operators) {
          const result = operators[op](value);
          where[property] = {[result.op]: result.value};
        }
        continue;
      }

      where[property] = properties[property];
    }
  }

  return where;
};


const parsePagination = (query) => {
  const {page, limit} = query;
  if (!page && !limit) {
    return null;
  }

  return {
    page: +page,
    limit: +limit
  };
};

const convertQuery = (query) => {
  const result = {
    order: parseOrder(query.order),
    where: parseWhere(query),
    ...parsePagination(query)
  };

  return pick(result);
};

module.exports = convertQuery;
