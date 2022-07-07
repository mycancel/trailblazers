const User = require('./User');
const Favorite = require("./Favorite");

// TODO: ADD RELATIONSHIPS

Favorite.belongsTo(User, {
    foreignKey: "review_id"
})

User.hasMany(Favorite, {
    foreignKey: "review_id"
})



module.exports = { User, Review,};
