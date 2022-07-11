const router = require("express").Router();
const { Favorite } = require('../models');
const axios = require("axios");
require("dotenv").config();

// Route to view park information
router.get("/:code", async (req, res) => {
  try {
    const parkCode = req.params.code;

    let checkFavorite;
    // If user is logged in
    if (req.session.logged_in) {
      // Gets all favorite parks from user
      const favParks = await Favorite.findAll({
        attributes: ['park_code'],
        where: {
          user_id: req.session.user_id,
        },
      });
  
      // Serializes data
      const serialFavParks = JSON.parse(JSON.stringify(favParks));
      // Checks if the selected park is already favorited
      checkFavorite = serialFavParks.some((park) => park.park_code === parkCode);
    } else {
      checkFavorite = false;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    // Gets park information from National Park Service API
    const { data: { data } } = await axios.get(
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
        parkCode +
        "&api_key=" +
        process.env.API,
      requestOptions
    );

    const name = data[0].fullName;
    const address = data[0].addresses[0];
    const contact = data[0].contacts.phoneNumbers[0].phoneNumber;
    const description = data[0].description;
    const hoursOfOp = data[0].operatingHours[0].standardHours;
    const imgURL = data[0].images[0].url;

    // returns park information
    const park = {
      name: name,
      address: address,
      contact: contact,
      description: description,
      imgURL: imgURL,
      hoursOfOp: hoursOfOp,
      loggedIn: req.session.logged_in,
      checkFavorite: checkFavorite
    };
    // Serializes data
    const parkInfo = JSON.parse(JSON.stringify(park));

    // Renders parks to parkpage
    res.render("parkpage", parkInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
