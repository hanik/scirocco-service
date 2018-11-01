const db = require('../../helpers/db');

const list = () => db.getHistoryList();

const serviceModel = () => db.getServiceModel();

module.exports = {
  list,
  serviceModel,
};
