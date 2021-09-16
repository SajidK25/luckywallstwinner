var express = require('express');
var router = express.Router();
let Core = require("../core/core")

let core = new Core();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('categorised');
});

module.exports = router;
