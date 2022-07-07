const { Favorite } = require("../models")

const favoriteData = [
  {
    "value": "false",
    "parkCode": "smitty"
  },
  {
    "value": "true",
    "parkCode": "asis"
  },
  {
    "value": "false",
    "parkCode": "traugh"
  }
];
const seedFavorite = () => Favorite.bulkCreate(favoriteData)

module.exports = seedFavorite;