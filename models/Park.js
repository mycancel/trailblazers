const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Park extends Model {}

Park.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        park_name: {
            type: DataTypes.STRING,
        },
        park_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        park_contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        park_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        park_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Review",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'park',
    }
)


module.exports = Park;
