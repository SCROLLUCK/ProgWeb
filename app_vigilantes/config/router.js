const express = require('express');
const controller = require('../app/controlers/main')
const router = express.Router();

router.get('/',         controller.index);
router.get('/about',    controller.about)
router.get('/ui',    controller.ui)
router.get('/game', controller.game)

module.exports = router;