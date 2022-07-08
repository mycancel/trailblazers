const router = require('express').Router();
const { Favorite } = require('../models');
const axios = require("axios");
require("dotenv").config();

router.get('/', async (req, res) => {
  try {
    const favParks = await Favorite.findAll({
      attributes: ['park_code'],
      where: {
        user_id: req.session.user_id,
      },
    });

    const parkCode = JSON.parse(JSON.stringify(favParks));
    
    // TODO: Un-negate this to work on this portion of the application
    if (!parkCode) {
      let parkString = '';
      parkCode.forEach((o) => {
        parkString = parkString + `${Object.values(o)},`;
      });
      
      // TODO: recieve data for parkString of parkCode
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // retrieves parks from National Parks Services API
      const data = axios
        .get(
          "https://developer.nps.gov/api/v1/parks?parkCode=" +
            parkString +
            "&api_key=" +
            process.env.API,
          requestOptions
        );

      console.log(data);

      // res.render('dashboard', {
      //   parks,
      //   loggedIn: req.session.logged_in,
      // });

    } else {
      const message = { message: 'No parks favorited.' };
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
