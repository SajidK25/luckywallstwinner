var express = require('express');
var router = express.Router();
let Core = require("../core/core")
let User = require("../core/user")

let core = new Core();
/* GET home page. */
router.get('/', function (req, res, next) {
    h = parseFloat(req.query.h)
    l = parseFloat(req.query.l)
    s = parseInt(req.query.s)
    let user = new User();
    user.filterBy('p', 0, 1000);
    if (parseFloat(h) > 0) {
        user.filterBy('cp', l, h);
        user.rankBy('c', 1);
    } else {
        user.filterBy('cp', l, h);
        user.rankBy('c', -1);
    }
    res.send(user.getSymbolsFromArray(user.DATA_array.slice(0, s).filter((e) =>
        e.s.length < 5
    )));
    // res.send(["DJI","NDX"]);
});


router.get('/price/', function (req, res, next) {
    h = parseFloat(req.query.h)
    l = parseFloat(req.query.l)
    s = parseInt(req.query.s)
    gl = req.query.gl
    let user = new User();
    user.filterBy('p', l, h);


    if (gl == 'g') {
        user.filterBy('cp', 0, 100000000);

        user.rankBy('c', 1);
    } else {
        user.filterBy('cp', -100000000, 0);
        user.rankBy('c', -1);
    }

    res.send(user.getSymbolsFromArray(user.DATA_array.slice(0, s)));
});

// router.get('/gainorLoss/', function (req, res, next) {
//     h = parseFloat(req.query.h)
//     l = parseFloat(req.query.l)
//     s = parseInt(req.query.s)
//     let user = new User();
//     user.filterBy('p', 0, 1000);
//     if (parseFloat(h) > 0) {
//         user.filterBy('cp', l, h);
//         user.rankBy('c', 1);
//     } else {
//         user.filterBy('cp', l,h);
//         user.rankBy('c', -1);
//     }
//     res.send(user.getSymbolsFromArray(user.DATA_array.slice(0, s)));
//     delete user;
// });

// router.get('/gainorLoss/', function (req, res, next) {

//     h = parseFloat(req.query.h)
//     l = parseFloat(req.query.l)
//     core.makeList();
//     core.filterByPrice(0, 1000);
//     if (parseFloat(h) > 0) {
//         core.filterByPrecentage(l, h);
//         core.rankByChange(1);
//     } else {
//         core.filterByPrecentage(h, l);
//         core.rankByChange(-1);
//     }

//     res.send(core.getSymbolsFromArray(core.DATA_array.slice(0, 30)));


// });



// router.get('/', function (req, res, next) {
//     h = parseFloat(req.query.h)
//     l = parseFloat(req.query.l)
//     core.makeList();
//     if (parseFloat(h) > 0) {
//         core.filterByPrecentage(l, h);
//         core.rankByChange(1);
//     } else {
//         core.filterByPrecentage(h, l);
//         core.rankByChange(-1);
//     }

//     res.send(core.getSymbolsFromArray(core.DATA_array.slice(0, 30)));
// });

module.exports = router;
