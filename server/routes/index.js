const express = require('express');
const current = require('../services/current/feedback');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('TESTESTST');
  res.render('index', { title: 'Express' });
});

router.post('/api/current/feedback/info', (req, res, next) => {
  res.send(current.info());
});

router.post('/api/current/feedback/create', (req, res, next) => {
  res.send(current.create());
});


module.exports = router;
