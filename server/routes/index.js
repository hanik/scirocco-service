const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('TESTESTST');
  res.render('index', { title: 'Express' });
});

router.post('/api/current/feedback/info', (req, res, next) => {
  console.log('/api/current/feedback/info');
  // TODO
  // 1. 현재 진행중인 녀석 : /rawdata/TRAINING - rawdata/DEFAULT
  // 2. 총 개수는 /feedback + 현재 진행중인 녀석
  res.send('running...');
});

router.post('/api/current/feedback/create', (req, res, next) => {
  console.log('/api/current/feedback/create');
  res.send('running...');
});


module.exports = router;
