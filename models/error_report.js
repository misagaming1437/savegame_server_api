
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connectDB.js';

export class ErrorReport extends Model { }
ErrorReport.init({

    branch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gameName: {
        type: DataTypes.STRING,

    },
    message: {
        type: DataTypes.STRING,

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