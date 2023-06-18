
import gameCategoryController from '../controllers/game_categoryController.js';
import express_promise from 'express-promise-router';


const router = express_promise();
export const initGameCategoryRoute =(app)=>{
    router.post('/', gameCategoryController.createCategoryByIdGame)
    return app.use('/game-category', router);
}
export default{
    initGameCategoryRoute
}