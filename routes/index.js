var express = require('express');
var router = express.Router();
let Core = require("../core/core")

let core = new Core();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/gainlose', function(req, res, next) {
    res.render('gainlose');
});

router.get('/price', function(req, res, next) {
    res.render('price');
});

module.exports = router;
