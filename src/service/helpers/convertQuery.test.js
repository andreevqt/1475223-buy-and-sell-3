'use strict';
/* eslint-disable no-undef */

const {Sequelize} = require(`sequelize`);
const convertQuery = require(`./convertQuery`);

const data = [
  {
    query: {
      authorId: `4`,
    },
    out: {
      where: {
        authorId: `4`
      },
      order: [[`createdAt`, `desc`]]
    }
  }, {
    query: {
      price: `lt:4`,
    },
    out: {
      where: {
        price: {
          $lt: `4`
        }
      },
      order: [[`createdAt`, `desc`]]
    }
  }, {
    query: {
      price: `sdsdsqw:4`,
    },
    out: {
      where: {
      },
      order: [[`createdAt`, `desc`]]
    }
  }, {
    query: {
      amount: `gt:99`,
    },
    out: {
      where: {
        amount: {
          $gt: `99`
        }
      },
      order: [[`createdAt`, `desc`]]
    }
  }, {
    query: {
      order: `popular`,
    },
    out: {
      order: [[Sequelize.literal(`"commentsCount"`), `desc`]]
    }
  }, {
    query: {
      order: `asc`,
    },
    out: {
      order: [[`createdAt`, `asc`]]
    }
  }, {
    query: {
      order: `desc`,
    },
    out: {
      order: [[`createdAt`, `desc`]]
    },
  }, {
    query: {
      page: `1`,
      limit: `4`
    },
    out: {
      page: 1,
      limit: 4,
      order: [[`createdAt`, `desc`]]
    },
  }
];

describe(`Should convert request query to sequelize query`, () => {
  test(`Should parse params correctly`, () => {
    data.forEach((item) => {
      const {query, out} = item;
      const result = convertQuery(query);
      expect(result).toEqual(out);
    });
  });
});
