
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB2.js';

export class ResponseCustomer extends Model { }
ResponseCustomer.init({
    branch: {
        type: DataTypes.STRING
    },
    customer: {
        type: DataTypes.STRING
    },
    responseType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.STRING
    },

},
    {
        sequelize,
        modelName: 'ResponseCustomer',
        timestamps: true,
        updatedAt: false,

    }
)
export default {
    ResponseCustomer
}