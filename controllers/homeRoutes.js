const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

const states = [
  { name: 'AL', selected: false },
  { name: 'AR', selected: false },
  { name: 'AK', selected: false },
  { name: 'AZ', selected: false },
  { name: 'CA', selected: false },
  { name: 'CO', selected: false },
  { name: 'CT', selected: false },
  { name: 'DE', selected: false },
  { name: 'FL', selected: false },
  { name: 'GA', selected: false },
  { name: 'HI', selected: false },
  { name: 'IA', selected: false },
  { name: 'ID', selected: false },
  { name: 'IL', selected: false },
  { name: 'IN', selected: false },
  { name: 'KS', selected: false },
  { name: 'KY', selected: false },
  { name: 'LA', selected: false },
  { name: 'MA', selected: false },
  { name: 'MD', selected: false },
  { name: 'ME', selected: false },
  { name: 'MI', selected: false },
  { name: 'MN', selected: false },
  { name: 'MO', selected: false },
  { name: 'MS', selected: false },
  { name: 'MT', selected: false },
  { name: 'NC', selected: false },
  { name: 'ND', selected: false },
  { name: 'NE', selected: false },
  { name: 'NH', selected: false },
  { name: 'NJ', selected: false },
  { name: 'NM', selected: false },
  { name: 'NV', selected: false },
  { name: 'NY', selected: false },
  { name: 'OH', selected: false },
  { name: 'OK', selected: false },
  { name: 'OR', selected: false },
  { name: 'PA', selected: false },
  { name: 'RI', selected: false },
  { name: 'SC', selected: false },
  { name: 'SD', selected: false },
  { name: 'TN', selected: false },
  { name: 'TX', selected: false },
  { name: 'UT', selected: false },
  { name: 'VA', selected: false },
  { name: 'WA', selected: false },
  { name: 'WI', selected: false },
  { name: 'WV', selected: false },
  { name: 'WY', selected: false },
];

const activities = [
  { value: 'BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA', name: 'Hiking', selected: false },
  { value: '13A57703-BB1A-41A2-94B8-53B692EB7238', name: 'Astronomy', selected: false },
  { value: '5F723BAD-7359-48FC-98FA-631592256E35', name: 'Auto and ATV', selected: false },
  { value: '7CE6E935-F839-4FEC-A63E-052B1DEF39D2', name: 'Biking', selected: false },
  { value: '071BA73C-1D3C-46D4-A53C-00D5602F7F0E', name: 'Boating', selected: false },
  { value: 'A59947B7-3376-49B4-AD02-C0423E08C5F7', name: 'Camping', selected: false },
  { value: 'B12FAAB9-713F-4B38-83E4-A273F5A43C77', name: 'Climbing', selected: false },
]

router.get("/", (req, res) => {
  res.render("index", { states, activities });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Route to view search results
router.get("/search-results", async (req, res) => {
  try {
    const { stateCode, activityId } = req.query;

    const selectedStates = states.map(o => o.name === stateCode ? { ...o, selected: true } : o);
    const selectedActivities = activities.map(o => o.value === activityId ? { ...o, selected: true } : o);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // retrieves parks from National Parks Services API
    const { data: { data } } = await axios
      .get(
        "https://developer.nps.gov/api/v1/activities/parks?id=" +
          activityId +
          "&api_key=" +
          process.env.API,
        requestOptions
      )
    // retrieves data property from axios response
    // filters through parks returned by fetch request
    const parks = data[0].parks.filter(park => park.states.includes(stateCode));

    // Renders parks to homepage
    return res.render("search-results", { 
      parks, 
      stateCode, 
      activityId, 
      states: selectedStates, 
      activities: selectedActivities 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
