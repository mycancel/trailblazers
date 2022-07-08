const router = require('express').Router();
const { Favorite } = require('../models');
const axios = require("axios");
require("dotenv").config();

router.get('/', async (req, res) => {
  try {
    const parkCode = await Favorite.findAll({
      attributes: {
        include: ['park_code']
      },
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!parkCode) {
      // TODO: map each park of parkCode
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // retrieves parks from National Parks Services API
      const { data: { data } } = await axios
        .get(
          "https://developer.nps.gov/api/v1/parks?id=" +
            parkCode +
            "&api_key=" +
            process.env.API,
          requestOptions
        )
      // retrieves data property from axios response
      const parks = data

      res.render('dashboard', {
        parks,
        loggedIn: req.session.logged_in,
      });

    } else {
      const message = 'No parks favorited.'
      res.render('dashboard', {
        message,
        loggedIn: req.session.logged_in,
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
