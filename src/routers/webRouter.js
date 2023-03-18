import express from 'express';
import homeController from '../controllers/Web/homeController';

let router = express.Router();

const initialWebRouter = (app) => {
    router.get('/', homeController.getHomePage)


    return app.use('/', router);
}

export default initialWebRouter