
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';
import { UserGame } from '../models/user_game.js'

export class Point extends Model {}
Point.init({
    point: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
       
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
     
        allowNull: true,

    },
    count:{
        type:DataTypes.INTEGER,
        defaultValue: 1
    }

},
    {
        sequelize,
        modelName: 'Points',
        timestamps: true
    }
    
)
Point.removeAttribute('id');
UserGame.hasOne(Point, { foreignKey: {name: 'IdUserGame', allowNull: false}});
Point.belongsTo(UserGame, { foreignKey: 'IdUserGame'});

export default {
    Point
}