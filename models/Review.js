const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        star: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: "id"
            }
        }
    }, 
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
    }
)

module.exports = Review;