const express = require('express');
const router = express.Router();
const db = require('../database');
const BaseCrudController = require('./BaseCrud')(db.Game);
const BASE_ROUTE = '/games';
const BASE_ID_ROUTE = BASE_ROUTE + '/:id';

router.get(BASE_ROUTE, BaseCrudController.getAll);
router.post(BASE_ROUTE, BaseCrudController.createRecord);
router.get(BASE_ID_ROUTE, BaseCrudController.getById);
router.put(BASE_ID_ROUTE, BaseCrudController.updateById);
router.delete(BASE_ID_ROUTE, BaseCrudController.deleteById);

module.exports = router;