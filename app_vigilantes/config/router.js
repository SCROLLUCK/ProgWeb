const express = require('express');
const controller = require('../app/controlers/main')
const areaController = require('../app/controlers/area')
const router = express.Router();

router.get('/',         controller.index);
router.get('/about',    controller.about)
router.get('/ui',       controller.ui)
router.get('/game',     controller.game)

router.get('/area',     areaController.index);

module.exports = router;