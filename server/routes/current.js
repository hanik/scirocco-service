const express = require('express');
const feedback = require('../services/current/feedback');
const prepare = require('../services/current/prepare');

const router = express.Router();

router.post('/feedback/info', async (req, res) => {
  const info = await feedback.info();
  res.send(info);
});

router.post('/feedback/create', async (req, res) => {
  const create = await feedback.create(req.body);
  res.send(create);
});

router.post('/prepare/start', async (req, res) => {
  const start = prepare.start(req.body);
  res.send(start);
});

router.post('/prepare/state', async (req, res) => {
  const state = await prepare.state(req.body);
  res.send(state);
});

router.post('/prepare/info', async (req, res) => {
  const info = await prepare.info();
  res.send(info);
});

module.exports = router;
