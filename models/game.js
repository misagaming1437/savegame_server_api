
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';

export class Game extends Model {}
Game.init({
    name: {
        type: DataTypes.STRING
    },
    path: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    savePath: {
        type: DataTypes.STRING
    },
    info: {
        type: DataTypes.STRING(1000000)
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        null: false
    },
    
},
    {
        sequelize,
        modelName: 'Game',
        timestamps: false
    }
)

export default {
    Game
}