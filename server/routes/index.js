var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('TESTESTST')
  res.render('index', { title: 'Express' });
});

router.post('/api/current/state', function(req, res, next) {
    console.log('api.translate')
    res.send('running...')
});

router.post('/api/current/prepare', function(req, res, next) {
    console.log('api.translate')
    res.send('running...')
});

module.exports = router;
˚