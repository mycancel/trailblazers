const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Favorite extends Model {}

Favorite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        checked: {
            type: DataTypes.BOOLEAN,
        },
        Favorite_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "park",
                key: "id"
            }
        }
    }, 
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'favorite',
    }
)

module.exports = Favorite;