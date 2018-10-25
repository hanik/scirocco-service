const db = require('../../helpers/db');

const state = () => db.getCurrentState();

const setState = value => db.setCurrentState(value);

module.exports = {
  state,
  setState,
};
