const express = require('express');
const feedback = require('../services/current/feedback');
const prepare = require('../services/current/prepare');
const training = require('../services/current/training');
const translation = require('../services/current/translation');
const verify = require('../services/current/verify');
const current = require('../services/current');

const router = express.Router();

router.post('/state', (req, res) => {
  const state = current.state();
  res.send(state.toString());
});

router.post('/set-state', (req, res) => {
  const state = current.setState(req.body.state);
  res.send(state.toString());
});

router.post('/init', (req, res) => {
  const init = current.init();
  res.send(init.toString());
});

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

router.post('/prepare/cancel', async (req, res) => {
  const cancel = await prepare.cancel();
  res.send(cancel);
});

router.post('/training/start', async (req, res) => {
  const start = await training.start();
  res.send(start);
});

router.post('/training/state', async (req, res) => {
  const state = training.state();
  res.send(state);
});

router.post('/training/restart', (req, res) => {
  const restart = training.restart();
  res.send(restart);
});

router.post('/training/cancel', async (req, res) => {
  const cancel = await training.cancel();
  res.send(cancel);
});

router.post('/verify/use', async (req, res) => {
  const use = await verify.use();
  res.send(use);
});

router.post('/verify/no-use', async (req, res) => {
  const noUse = await verify.noUse();
  res.send(noUse);
});

router.post('/verify/confirm', async (req, res) => {
  const confirm = await verify.confirm();
  res.send(confirm);
});

router.post('/translation/restart', (req, res) => {
  const restart = translation.restart();
  res.send(restart);
});

router.post('/translation/restart/change-model', (req, res) => {
  const restart = translation.restartChangeModel(req.body);
  res.send(restart);
});

// router.post('/translation/restart/after-verify', (req, res) => {
//   const restart = translation.restartAfterVerify();
//   res.send(restart);
// });

module.exports = router;
