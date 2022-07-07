const { Park } = require("../models")

const parkData = [
    {
        "park_name": "Yellowstone",
        "park_address": "1234 Central Drive",
        "park_contact": "123-456-7890",
        "park_description": "A fun park you should go to, it's great."
    },
    {
        "park_name": "Big Park",
        "park_address": "1234 Big Park Drive",
        "park_contact": "222-333-4444",
        "park_description": "This park is just ok"
    },
    {
        "park_name": "New Park",
        "park_address": "1234 New Park Drive",
        "park_contact": "444-555-7777",
        "park_description": "Fun park to take your kids to"
    }
]; 

const seedPark = () => Park.bulkCreate(parkData)

module.exports = seedPark; 