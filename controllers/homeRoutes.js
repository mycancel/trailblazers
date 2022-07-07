const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Farorite } = require('../models');
const withAuth = require('../utils/auth');

const serialize = (data) => JSON.parse(JSON.stringify(data));

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

module.exports = router;
