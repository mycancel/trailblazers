const { Review } = require("../models")

const reviewData = [
    {
        "star": "3",
        "message": "This was a mediocre park."
    },
    {
        "star": "5",
        "message": "Amazing park!"
    },
    {
        "star": "1",
        "message": "This park was horrible!"
    }
];
const seedReview = () => Review.bulkCreate(reviewData)

module.exports = seedReview;