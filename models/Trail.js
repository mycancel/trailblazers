const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Trail extends Model {}

Trail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        trail_name: {
            type: DataTypes.String,
        },
        trail_id: {
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
        modelName: 'trail',
    }
)


module.exports = Trail;
