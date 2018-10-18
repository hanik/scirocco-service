const db = require('../../helpers/db');

const state = () => db.getCurrentState();

module.exports = {
  state,
};
