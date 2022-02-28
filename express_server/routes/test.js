var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/get', function(req, res, next) {
    res.send('GET request to the homepage');
});

router.post('/post', function(req, res) {
    console.log(req.body);
    res.send('POST request to the homepage');
});

module.exports = router;