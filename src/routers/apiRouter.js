import express from 'express';
import homeController from '../controllers/Api/homeController';
import authController from '../controllers/Api/authController';
import uploadFileController from '../controllers/Api/uploadFileController';
import verifyToken from '../middlewares/verifyToken';
import taskController from '../controllers/Api/taskController';
import upload from '../middlewares/uploadFile'

let router = express.Router();

const initialApiRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    router.get('/profile', verifyToken, authController.profile);
    router.post('/upload', uploadFileController.uploadImage);
    router.post('/upload-multiple' , uploadFileController.uploadMultipleImages);
    router.post('/task', taskController.createTask);
    return app.use('/api', router);
}

export default initialApiRouter