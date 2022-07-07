const User = require('./User');
const Favorite = require('./Favorite');
// TODO: ADD RELATIONSHIPS

Favorite.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Favorite, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Favorite };
