import express from 'express';
import homeController from '../controllers/Api/homeController';

let router = express.Router();

const initialApiRouter = (app) => {
    router.get('/', homeController.getHomePage)


    return app.use('/api', router);
}

export default initialApiRouter