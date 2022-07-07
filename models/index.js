const User = require('./User');
const Review = require("./Review");
const Park = require("./Park")
// TODO: ADD RELATIONSHIPS

Review.belongsTo(User, {
    foreignKey: "review_id"
})

User.hasMany(Review, {
    foreignKey: "review_id"
})

Review.belongsToMany(Park, {
    through: Park,
    foreignKey: "review_id"
})

module.exports = { User, Review, Park };
