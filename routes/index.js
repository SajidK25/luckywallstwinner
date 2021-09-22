var express = require('express');
var router = express.Router();
let Core = require("../core/core");
var watchlistService = require('../service/watchlistService');

let core = new Core();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/gainlose', function (req, res, next) {
    res.render('gainlose');
});

router.get('/price', function (req, res, next) {
    res.render('price');
});

router.get('/watchlist/add', function (req, res, next) {
    res.render('watchlist');
})

router.get('/watchlist', async function (req, res, next) {
    var watchlist = await watchlistService.getWatchlist();
    res.json(watchlist)
})

router.post('/watchlist/add', async function (req, res, next) {
    var newWatchlist = req.body["wl[]"];
    await watchlistService.addWatchlist(newWatchlist);
    res.json({"ok":true})
})

module.exports = router;
