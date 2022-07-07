const router = require("express").Router();
const axios = require("axios");

// Returns data for specific park
function getPark({ parkCode }) {
  // TODO: Check if parkCode is being recieved from selectPark.js
  // console.log(parkCode);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  axios
    .get(
      `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=NkH26hNE8uCOcIC7vkfHHuLqFaIv9UUy6uuQJGqC`,
      requestOptions
    )
    // retrieves data property from axios response
    .then((response) => response.data)
    .then((response) => {
      const data = response.data[0];
      const name = data.fullName;
      const address = data.addresses[0];
      const contact = data.contacts.phoneNumbers[0].phoneNumber;
      const description = data.description;

      // name = Catoctin Mountain Park
      // address = {
      //   postalCode: '21788',
      //   city: 'Thurmont',
      //   stateCode: 'MD',
      //   line1: '14707 Park Central Road',
      //   type: 'Physical',
      //   line3: '',
      //   line2: ''
      // }
      // contact = 3016639388
      // description =President Franklin D. Roosevelt created programs to give people a chance to rebuild their lives from the Great Depression. The Works Progress Admin
      // istration and the Civilian Conservation Corps gave this land a second opportunity and through re-growth, a new role as a recreation area.

      // returns park information
      return {
        name: name,
        address: address,
        contact: contact,
        description: description,
      };
    })
    .catch((error) => console.log("error", error));
}

// Route to view park information
router.get("/", async (req, res) => {
  try {
    const park = getPark(...req.body);

    // Serializes data
    const results = JSON.parse(JSON.stringify(park));

    // Renders parks to homepage
    res.render("parkpage", {
      results,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;