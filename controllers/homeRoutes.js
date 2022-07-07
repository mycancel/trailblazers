const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Farorite } = require('../models');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/index');
      return;
  }
  res.render('login');
});

module.exports = router;
