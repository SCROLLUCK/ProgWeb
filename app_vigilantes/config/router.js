const express = require('express');
const controller = require('../app/controlers/main');
const areaController = require('../app/controlers/area');
const cursoController = require('../app/controlers/curso');

const router = express.Router();

router.get('/',                     controller.index);
router.get('/about',                controller.about);
router.get('/ui',                   controller.ui);
router.get('/game',                 controller.game);

router.get('/area',                 areaController.index);

router.get('/curso',                cursoController.index);
router.get('/curso/create',         cursoController.create);
router.post('/curso/create',        cursoController.create);

router.get('/curso/:id',            cursoController.read);
router.get('/curso/update/:id',     cursoController.update);
router.post('/curso/update/:id',    cursoController.update);


router.get('/curso/remove/:id',     cursoController.remove);


module.exports = router;