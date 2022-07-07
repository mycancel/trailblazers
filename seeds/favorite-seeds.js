const { Favorite } = require("../models")

const favoriteData = [
  {
    "value": "false",
    "park_code": "smitty"
  },
  {
    "value": "true",
    "park_code": "asis"
  },
  {
    "value": "false",
    "park_code": "traugh"
  }
];
const seedFavorite = () => Favorite.bulkCreate(favoriteData)

module.exports = seedFavorite;