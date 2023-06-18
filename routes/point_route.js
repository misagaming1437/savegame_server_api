import { uploadSave } from '../middlewares/multer_midleware.js'
import express_promise from 'express-promise-router';
import  pointService  from '../services/pointService.js';

const router = express_promise();
export const initPointRoute =(app)=>{

    router.patch('/update', uploadSave.single('file'), pointService.updatePoint)
    router.delete('/delete',pointService.deletePoint)
    router.post('/create', uploadSave.single('file'), pointService.create)
    router.get('/getLinkFile', pointService.getLinkFile)
    router.get('/:userId&:gameId', pointService.getPoints)
    return app.use('/points', router);
}
export default{
    initPointRoute }