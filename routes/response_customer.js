import responseCustomerService from '../services/responseCustomerService.js';
import express_promise from 'express-promise-router';


const router = express_promise();

export const initResponseCustomerRoute = (app) => {
    router.get('/', responseCustomerService.getAllResponses)
    router.post('/', responseCustomerService.createResponse)
    router.delete('/', responseCustomerService.deleteAllResponses)
    router.delete('/deleteReponse/:id', responseCustomerService.deleteResponse)

    return app.use('/response_customer', router);
}

export default {
    initResponseCustomerRoute
}