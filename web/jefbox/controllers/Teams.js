const express = require('express');
const router = express.Router();
const BaseCrudController = require('./BaseCrud')(require('../models/Team'));

router.get('/teams', BaseCrudController.getAll);
router.post('/teams', BaseCrudController.createRecord);
router.get('/teams/:id', BaseCrudController.getById);
router.put('/teams/:id', BaseCrudController.updateById);
router.delete('/teams/:id', BaseCrudController.deleteById);

module.exports = router;