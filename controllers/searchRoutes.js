const router = require("express").Router();
const axios = require("axios");
require('dotenv').config();

// Returns search results of all parks according to state and activity
function getAllParks({ stateCode, activityId }) {
  // TODO: Check if info is being recieved from search.js
  // console.log(stateCode, activityId);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  axios
    .get(
      `https://developer.nps.gov/api/v1/activities/parks?id=${activityId}&api_key=${process.env.API}`,
      requestOptions
    )
    // retrieves data property from axios response
    .then((response) => response.data)
    // filters through parks returned by fetch request
    .then((response) => {
      const parks = response.data[0].parks;
      let results = parks.filter((park) => {
        return park.states.includes(stateCode);
      });

      // [
      //   {
      //     states: 'CT,GA,MA,MD,ME,NC,NH,NJ,NY,PA,TN,VA,VT,WV',
      //     parkCode: 'appa',
      //     designation: 'National Scenic Trail',
      //     fullName: 'Appalachian National Scenic Trail',
      //     url: 'https://www.nps.gov/appa/index.htm',
      //     name: 'Appalachian'
      //   },
      //   {
      //     states: 'MD,VA',
      //     parkCode: 'asis',
      //     designation: 'National Seashore',
      //     fullName: 'Assateague Island National Seashore',
      //     url: 'https://www.nps.gov/asis/index.htm',
      //     name: 'Assateague Island'
      //   }
      // ]

      // returns new array with parks in specified state
      return results;
    })
    .catch((error) => console.log("error", error));
}

// Route to view search results
router.get("/", async (req, res) => {
  try {
    const parks = getAllParks(...req.body);

    // Serializes data
    const results = JSON.parse(JSON.stringify(parks));

    // Renders parks to homepage
    res.render("search", {
      results,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;