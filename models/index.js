const User = require('./User');
const Review = require("./Review");
const Trail = require("./Trail")
// TODO: ADD RELATIONSHIPS

Review.belongsTo(User, {
    foreignKey: "review_id"
})

User.hasMany(Review, {
    foreignKey: "review_id"
})

Trail.belongsToMany(Review, {
    foreignKey: "review_id"
})

module.exports = { User, Review, Trail };
