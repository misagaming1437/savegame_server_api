
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';
import { Game } from './game.js'
import { User } from './user.js'

export class UserGame extends Model {}
UserGame.init({
    IdUserGame: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
 },
    {           
        sequelize,
        modelName: 'User_Game',
        timestamps: false
    }
)
User.belongsToMany(Game, { through: UserGame }, { foreignKey: 'UserId'});
Game.belongsToMany(User, { through: UserGame }, { foreignKey: 'GameId'});

export default {
    UserGame
}