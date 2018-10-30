const db = require('../../helpers/db');

const state = () => db.getCurrentState();

const setState = value => db.setCurrentState(value);

const init = () => db.setCurrentState(10);

module.exports = {
  state,
  setState,
  init,
};
