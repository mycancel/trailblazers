const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// Route to view park information
router.get("/:code", async (req, res) => {
  try {
    // TODO: Check if parkCode is being recieved from selectPark.js
    const parkCode = req.body.params;
    // console.log(parkCode);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const park = await axios
      .get(
        "https://developer.nps.gov/api/v1/parks?parkCode=" +
          parkCode +
          "&api_key=" +
          process.env.API,
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
        const hoursOfOp = data.operatingHours[0].standardHours;
        const imgURL = data.images[0].url;

        // returns park information
        return {
          name: name,
          address: address,
          contact: contact,
          description: description,
          imgURL: imgURL,
          hoursOfOp: hoursOfOp,
        };
      })
      .catch((error) => console.log("error", error));

    // Serializes data
    const results = JSON.parse(JSON.stringify(park));

    // Renders parks to parkpage
    res.render("parkpage", { results });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;