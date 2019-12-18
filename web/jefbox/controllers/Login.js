const User = require('../models/User');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  var user = req.session.user;
  if (user) {
    // TODO: Figure out a better way of doing this... also DRY it up
    User.updateUser({
      IsActive: true,
      Id: user.Id
    });
    return res.send(user);
  }
  res.sendStatus(401);
});

router.post('/login', (req, res) => {
  User.getUserByName(req.body.UserName).then((results) => {
    if (results) {
      // Now that we've found the user, let's check to see if they've entered the right password
      if (results.isPassword(req.body.Password)) {
        req.session.user = results;
        // TODO: Figure out a better way of doing this... also DRY it up
        User.updateUser({
          IsActive: true,
          Id: results.Id
        });
        return res.send({success: true, data: results});
      }
      return res.sendStatus(401);
    }
    User.createUser(req.body).then((results) => {
      req.session.user = results;
      // TODO: Figure out a better way of doing this... also DRY it up
      User.updateUser({
        IsActive: true,
        Id: results.Id
      });
      return res.send({success: true, data: results});
    });
  });
});

module.exports = router;