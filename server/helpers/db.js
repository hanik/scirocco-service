const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(`${process.env.PWD}/helpers/database/db.json`);
// const adapter = new FileSync(`/Users/actmember/workspace/scirocco-service/server/helpers/database/db.json`);
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
// const init = () => db.defaults({ history: [], user: {}, currentState: 10, currentModel: {} }).write();

const pushHistory = history => db.get('history')
  .push(history)
  .write();

const setUser = user => db.set('user', user).write();

const setCurrentState = (state) => {
  let intState = state;
  if (typeof state === 'string') {
    try {
      intState = parseInt(state, 10);
    } catch (e) {
      return e;
    }
  }
  // eslint-disable-next-line no-unused-vars
  return db.set('currentState', intState).write();
};

const getCurrentState = () => db.get('currentState').value();

const setCurrentModel = modelInfo => db.set('currentModel', modelInfo).write();

const getCurrentModel = () => db.get('currentModel').value();

module.exports = {
  pushHistory,
  setUser,
  setCurrentState,
  getCurrentState,
  setCurrentModel,
  getCurrentModel,
};
