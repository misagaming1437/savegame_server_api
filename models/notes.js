
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';

export class Note extends Model {}
Note.init({
    message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // createdAt: {
    //     type: DataTypes.TIME,
    //     allowNull: true
    // }
},
    {   
        sequelize,
        modelName: 'Notes',
        timestamps: true,
        updatedAt: false,
              
    }
)
Note.removeAttribute('id');
export default {
     Note
}