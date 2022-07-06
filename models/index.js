const User = require('./User');
const Review = require("./Review");
// TODO: ADD RELATIONSHIPS

User.hasMany(Review, {
    foreignKey: "review_id"
})

Review.belongsTo(User, {
    foreignKey: "review_id"
})

module.exports = { User, Review };
