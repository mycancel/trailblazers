// function to get all trails from fetch api
const axios = require('axios');
function getAllTrails() {


var requestOptions = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  },
  redirect: 'follow'
};
// axios.get("https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=NkH26hNE8uCOcIC7vkfHHuLqFaIv9UUy6uuQJGqC", requestOptions)
//   .then(response => response)
//   .then(result => console.log(result.data))
//   .catch(error => console.log('error', error));


axios.get("https://developer.nps.gov/api/v1/activities/parks?id=C11D3746-5063-4BD0-B245-7178D1AD866C&q=NC&api_key=NkH26hNE8uCOcIC7vkfHHuLqFaIv9UUy6uuQJGqC", requestOptions)
  .then(response => response.data)
  .then(result => console.log(result.data[0].parks))
  .catch(error => console.log('error', error));
}

getAllTrails();

// document.querySelector('').addEventListener('click', );


  