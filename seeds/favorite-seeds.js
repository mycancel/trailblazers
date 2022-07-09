const { Favorite } = require("../models")

const favoriteData = [
  {
    "name": "Nature Trail 1",
    "park_code": "smitty",
    "user_id": 1
  },
  {
    "name": "Nature Trail 2",
    "park_code": "asis",
    "user_id": 1
  },
  {
    "name": "Nature Trail 3",
    "park_code": "traugh",
    "user_id": 1
  }
];
const seedFavorite = () => Favorite.bulkCreate(favoriteData)

module.exports = seedFavorite;