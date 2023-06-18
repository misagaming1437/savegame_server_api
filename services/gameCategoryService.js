
import { GameCategory } from '../models/gamecategory.js';
import { Op } from 'sequelize';


const create = async (body) => {
   const { idGame, idCategories=[]  } = body

  
    try {     console.log('check',idCategories)
    await GameCategory.destroy({ where: { GameId: idGame, CategoryId:  { [Op.notIn]: idCategories } } })
      console.log('after')
    
      idCategories.forEach(async (idCategory) => {
      const count = await GameCategory.count({ where: { CategoryId: idCategory, GameId: idGame } })
      if (count == 0) {
        await GameCategory.create({ GameId: idGame, CategoryId: idCategory })
      }
    })
  } catch (err) {

    throw err
  }
}



export default {
  create, 
}