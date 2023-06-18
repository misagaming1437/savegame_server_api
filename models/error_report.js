
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';

export class ErrorReport extends Model {}
ErrorReport.init({
    gameName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {   
        sequelize,
        modelName: 'ErrorReports',
        timestamps: true,
        updatedAt: false,
              
    }
)

ErrorReport.removeAttribute('id');
export default {
     ErrorReport
}