
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';

export class Category extends Model {}
Category.init({
    name: {
        type: DataTypes.STRING
    },
    sort: {
        type: DataTypes.INTEGER
    },
    
},
    {
        sequelize,
        modelName: 'Category',
        timestamps: false
    }
)
export default {
    Category
}