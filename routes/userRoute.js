
import userController from '../controllers/userController.js';
import express_promise from 'express-promise-router';
import { validateBody, schemas, validateParam } from '../helpers/routerHelper.js';
import passportConfig from '../middlewares/passport.js';
import passport from 'passport';

passportConfig();
const router = express_promise();
const initUserRoute =(app)=>{
    router.get('/',userController.getAllUsers)
    router.patch('/:id',userController.updatePassword)
    router.delete('/:userName',validateParam('userName', schemas.userNameSchema),userController.deleteUser)
    router.get('/signin', validateBody(schemas.authSingin),passport.authenticate('local', {session: false}) , userController.signin)
    router.get('/token', passport.authenticate('jwt', {session: false}) , userController.signinToken)
    router.post('/signup', validateBody(schemas.authSingup),userController.signup)
    return app.use('/users', router);
}
export default{
    initUserRoute
}