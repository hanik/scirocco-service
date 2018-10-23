const express = require('express');
const feedback = require('../services/current/feedback');
const prepare = require('../services/current/prepare');
const training = require('../services/current/training');
const current = require('../services/current');

const router = express.Router();

router.post('/feedback/info', async (req, res) => {
  const info = await feedback.info();
  res.send(info);
});

router.post('/feedback/create', async (req, res) => {
  const create = await feedback.create(req.body.modelInfo);
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

router.post('/training/start', async (req, res) => {
  const start = await training.start();
  res.send(start);
});

router.post('/training/cancel', async (req, res) => {
  const cancel = await training.cancel();
  res.send(cancel);
});

router.post('/training/state', async (req, res) => {
  const state = await training.state();
  res.send(state);
});

router.post('/state', (req, res) => {
  const state = current.state();
  res.send(state.toString());
});

router.post('/prepare/cancel', async (req, res) => {
  const cancel = await prepare.cancel();
  res.send(cancel);
});

module.exports = router;
