
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';
import {Game} from './game.js'
import {Category} from './category.js'

export class GameCategory extends Model {}
GameCategory.init({
    
},
    {   
        
        sequelize,
        modelName: 'Game_Categories',
        timestamps: false
    }
)
Game.belongsToMany(Category, { through: GameCategory });
Category.belongsToMany(Game, { through: GameCategory });

export default {
     GameCategory
}