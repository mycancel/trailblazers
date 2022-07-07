const axios = require("axios");

// Returns search results of all parks according to state and activity
function getAllParks() {

  // TODO: add .value and .trim to query selections in variables below
  const stateCode = "MD";
  const activityId = "C11D3746-5063-4BD0-B245-7178D1AD866C";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  axios
    .get(
      `https://developer.nps.gov/api/v1/activities/parks?id=${activityId}&api_key=NkH26hNE8uCOcIC7vkfHHuLqFaIv9UUy6uuQJGqC`,
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

      console.log(results);
    })
    .catch((error) => console.log("error", error));
}

// Returns data for specific park
function showPark() {
  // TODO: retrieve parkCode from clicking on the park (data class? name? URL?)
  const parkCode = "cato";

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

      // returns new array with parks in specified state
      // TODO: pass the results to the search page
      return { name, address, contact, description };
    })
    .catch((error) => console.log("error", error));
}

getAllParks();