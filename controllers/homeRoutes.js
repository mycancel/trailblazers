const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Route to view search results
router.get("/search", async (req, res) => {
  try {
    const stateCode = req.query.state;
    const activityId = req.query.activity;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // retrieves parks from National Parks Services API
    const parks = await axios
      .get(
        "https://developer.nps.gov/api/v1/activities/parks?id=" +
          activityId +
          "&api_key=" +
          process.env.API,
        requestOptions
      )
      // retrieves data property from axios response
      .then((response) => response.data)
      // filters through parks returned by fetch request
      .then((response) => {
        const parks = response.data[0].parks;
        const results = parks.filter((park) => {
          return park.states.includes(stateCode);
        });

        // returns new array with parks in specified state
        return results;
      })
      .catch((error) => console.log("error", error));

    // Serializes data
    const results = JSON.parse(JSON.stringify(parks));

    console.log(results);
    // Renders parks to homepage
    res.render("index", { results: results });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
