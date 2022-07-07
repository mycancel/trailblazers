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
        value: {
            type: DataTypes.BOOLEAN,
        },
        park_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Favorite_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
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