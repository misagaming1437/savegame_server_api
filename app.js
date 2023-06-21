import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import logger from 'morgan';
// const logger = require('morgan')
import path from 'path';
import appRootPath from 'app-root-path'
import userRoute from './routes/userRoute.js';
import gameRoute from './routes/gameRoute.js';
import { initPointRoute } from './routes/point_route.js'
import { initNoteRoute } from './routes/note_route.js'
import { initResponseCustomerRoute } from './routes/response_customer.js'
import categoryRoute from './routes/categoryRoute.js';
import { initGameCategoryRoute } from './routes/game_categpory_route.js'
import { pathStoredSave } from './configs/index.js'
import { sequelize } from './connectDB.js';
import { sequelize as sequelize2 } from './connectDB2.js';
import { showConsole, hideConsole } from "node-hide-console-window";

import { installService, unInstallService } from './savegame_service.js'
import process from 'process';

// create service window/////////////////
hideConsole();

process.argv.forEach((e, index, array) => {
    console.log(e)
    if (e == '/install') {

        installService()
    }
    if (e == '/uninstall') {
        unInstallService();

    }
})
///////////////////////////////////////

const app = express();

sequelize.sync().then(() => console.log('db is ready'))
sequelize2.sync().then(() => console.log('db2 is ready'))

// 
// 
// 
const d = new Date().setDate(new Date().getDate)
console.log('datetime 2: ', d)
// 
// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(appRootPath.toString(), 'uploads')))
app.use('/usersData', express.static(path.join(pathStoredSave())))

dotenv.config();
app.use(helmet());
app.use(logger('dev'));

app.use(bodyParser.json())

// catch 404 err
initPointRoute(app);
userRoute.initUserRoute(app);
initNoteRoute(app);

gameRoute.initGameRoute(app);
categoryRoute.initCategoryRoute(app);
initGameCategoryRoute(app);
initResponseCustomerRoute(app);


// err handler function
// err handler function
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
app.use((err, req, res, next) => {
    const error = app.get('env') == 'development' ? err : {}
    const status = err.status || 500

    // respond to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})
const port = process.env.PORT || 5001;

app.listen(port, async () => {
    console.log('Server is listening on port: ', port)

})

