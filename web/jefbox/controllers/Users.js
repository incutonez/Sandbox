const express = require('express');
const router = express.Router();
const db = require('../database');
const BaseCrudController = require('./BaseCrud')(db.User);

router.get('/users', BaseCrudController.getAll);
router.post('/users', BaseCrudController.createRecord);
router.get('/users/:id', BaseCrudController.getById);
router.put('/users/:id', BaseCrudController.updateById);
router.delete('/users/:id', BaseCrudController.deleteById);

module.exports = router;