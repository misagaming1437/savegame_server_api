import { Sequelize } from "sequelize"
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './misa_info.db'
})
export default {
    sequelize
}