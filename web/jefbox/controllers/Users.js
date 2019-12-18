const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Gets all users
router.get('/users', function(req, res) {
  User.getAllUsers().then((results) => {
    res.send(results);
  });
});

router.post('/users', (req, res) => {
  User.createUser(req.body).then((results) => {
    res.send({success: true, data: results});
  });
});

router.get('/users/:id', (req, res) => {
  User.getUserById(req.params.id).then((results) => {
    res.send(results);
  });
});

// TODO: When this updates a user, it should potentially propagate that information to the logged in use through sockets
router.put('/users/:id', (req, res) => {
  User.updateUser(req.body).then((results) => {
    res.send({success: true, data: results});
  });
});

router.delete('/users/:id', (req, res) => {
  User.deleteUser(req.params.id).then((results) => {
    res.sendStatus(204);
  });
});

module.exports = router;