const router = require('express').Router();
const { Favorite } = require('../models');

router.get('/', async (req, res) => {
  try {
    const favParks = await Favorite.findAll({
      attributes: ['park_code', 'name'],
      where: {
        user_id: req.session.user_id,
      },
    });

    // Serializes favParks
    const parkData = JSON.parse(JSON.stringify(favParks));
    
    if (parkData) {
      res.render('dashboard', {
        parkData: parkData,
        loggedIn: req.session.logged_in,
      });

    } else {
      res.render('dashboard', {
        loggedIn: req.session.logged_in
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
