const db = require('../database');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  const user = req.session.user;
  if (user) {
    return db.User.getUserByName(user.UserName).then((userResult) => {
      req.session.user = userResult;
      res.send(userResult);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
  }
  res.sendStatus(401);
});

router.post('/login', (req, res) => {
  db.User.getUserByName(req.body.UserName).then((userResult) => {
    if (userResult) {
      // Now that we've found the user, let's check to see if they've entered the right password
      if (userResult.isPassword(req.body.Password)) {
        req.session.user = userResult;
        return res.send(userResult);
      }
      return res.sendStatus(401);
    }
    return db.User.createUser(req.body).then((userResult) => {
      req.session.user = userResult;
      res.send(userResult);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    // TODO: Figure out elegant way of handling errors
    console.log(err);
  });
});

module.exports = router;