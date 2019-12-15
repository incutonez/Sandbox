const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Gets all users
router.get('/users', function(req, res) {
  User.findAll().then((results) => {
    res.send(results);
  });
});

router.post('/users', (req, res) => {
  User.create({
    Name: req.body.Name
  }).then((results) => {
    res.send({success: true});
  });
});

router.put('/users/:id', (req, res) => {
  User.update({
    Name: req.body.Name
  }, {
    where: {
      Id: req.params.id
    }
  }).then((results) => {
    res.send({success: true});
  });
});

router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: {
      Id: req.params.id
    }
  }).then((results) => {
    res.send({success: true});
  });
});

module.exports = router;