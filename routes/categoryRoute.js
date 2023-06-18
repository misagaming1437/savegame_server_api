
import categoryController from '../controllers/categoryController.js';
import express_promise from 'express-promise-router';
// import { validateBody, schemas, validateParam } from '../helpers/routerGameHelper.js';

const router = express_promise();
const initCategoryRoute =(app)=>{
    router.get('/',categoryController.getAllCategories)
    router.delete('/',categoryController.deleteAll)
    router.patch('/:id',categoryController.updateCategory)
    router.delete('/:id', categoryController.deleteCategory)
    router.post('/create', categoryController.createCategory)
    router.post('/move-item', categoryController.moveItem)
    return app.use('/categories', router);
}
export default{
    initCategoryRoute
}