import { Sequelize } from "sequelize"
export const sequelize2 = new Sequelize({
    dialect: 'sqlite',
    storage: './misa_info.db'
})
export default {
    sequelize2
}