
import gameController from '../controllers/gameController.js';
import express_promise from 'express-promise-router';

import {upload} from '../middlewares/multer_midleware.js'
import GameService from '../services/gameService.js';
import ErrorService from '../services/error_service.js';




const router = express_promise();
const initGameRoute =(app)=>{

    router.get('/',gameController.getAllGame)
    router.get('/reports',ErrorService.getAllReports)
    router.post('/report/:id', ErrorService.createReportError)
    router.delete('/reports',ErrorService.deleteAllReports)
    router.patch('/:id', upload.single('imageFile'), gameController.updateGame)
    router.delete('/:id', gameController.deleteGame)
    router.post('/increase/:id', GameService.increaseCount)
  
    router.post('/create',  upload.single('imageFile') ,gameController.createGame)
    router.post('/create',  upload.single('imageFile') ,gameController.createGame)
    return app.use('/games', router);
}
export default{
    initGameRoute
}