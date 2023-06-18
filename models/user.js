
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';

export class User extends Model {}
User.init({
    userName: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    
},
    {
        sequelize,
        modelName: 'User',
        timestamps: false
    }
)

export default {
   User
}