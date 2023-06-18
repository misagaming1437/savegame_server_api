import GameCategoryService from '../services/gameCategoryService.js'

const createCategoryByIdGame =async (req, res, next)=>{
    
    await GameCategoryService.create(req.body)

return res.status(201).json({message: "ok"})
}

export default {
    createCategoryByIdGame,
      
}