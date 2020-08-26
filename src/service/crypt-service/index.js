'use strict';

const bcrypt = require(`bcrypt`);

const hash = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const compare = (pass, hashed) => {
  return bcrypt.compareSync(pass, hashed);
};

module.exports = {
  hash,
  compare
};

