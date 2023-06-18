import {Sequelize} from "sequelize"
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './savedb.db'
})
export default {
    sequelize
}