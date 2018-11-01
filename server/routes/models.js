const express = require('express');
const model = require('../services/models');

const router = express.Router();

router.post('/list', async (req, res) => {
  const list = await model.list();
  res.send(list);
});

router.post('/service-model', async (req, res) => {
  const serviceModel = await model.serviceModel();
  res.send(serviceModel);
});

module.exports = router;
