const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');

// Returns search results of all parks according to state and activity
const getAllParks = (stateCode, activityId) => {
  // TODO: Check if info is being recieved from search.js
  console.log(stateCode, activityId);
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
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
    .catch((error) => console.log('error', error));
}

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

// Route to view search results
router.post("/", async (req, res) => {
  try {
    console.log("POST " + req.body);

    const parks = getAllParks(stateCode, activityId);
    console.log(parks);
  
    // Serializes data
    const results = JSON.parse(JSON.stringify(parks));

    // Renders parks to homepage
    res.render("index", results);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
