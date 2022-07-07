const router = require('express').Router();
const { Favorite } = require('../models');

router.get('/', async (req, res) => {
  try {
    const userFavData = await Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    // Serializes data
    const results = JSON.parse(JSON.stringify(userFavData));

    res.render('dashboard', {
      results,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
