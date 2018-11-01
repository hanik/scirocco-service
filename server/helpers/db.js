/* eslint-disable no-underscore-dangle */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const { BASE_PATH, DB_PATH } = process.env;

const adapter = new FileSync(`${BASE_PATH}${DB_PATH}/db.json`);
// const adapter = new FileSync(`/Users/actmember/workspace/scirocco-service/server/helpers/database/db.json`);
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({
  history: [], user: {}, currentState: 10, currentModel: {},
}).write();

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

const setCurrentModel = (modelInfo) => {
  const model = {
    modelName: '',
    modelCreateAt: '',
    seq: _getModelSequence(),
    serviceStartAt: '',
    serviceEndAt: '',
    trainingStartAt: '',
    trainingEndAt: '',
    verifyResult: '0',
    admin: '',
    serviceYn: 'N',
    path: '',
    archive: 'N',
  };
  db.set('currentModel', Object.assign(model, modelInfo)).write();
};

const clearCurrentModel = () => db.set('currentModel', {}).write();

const getCurrentModel = () => db.get('currentModel').value();

const setServiceModel = modelInfo => db.set('serviceModel', modelInfo).write();

const getServiceModel = () => db.get('serviceModel').value();

const _getModelSequence = () => db.get('history').value().length + 1;

const updateHistory = (where, values) => db.get('history').find(where).assign(values).write();

const updateCurrentModel = values => db.get('currentModel').assign(values).write();

const getHistoryList = () => db.get('history').value();

module.exports = {
  pushHistory,
  setUser,
  setCurrentState,
  getCurrentState,
  setCurrentModel,
  getCurrentModel,
  setServiceModel,
  getServiceModel,
  updateCurrentModel,
  updateHistory,
  clearCurrentModel,
  getHistoryList,
};
