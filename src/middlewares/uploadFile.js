import multer from "multer";
import appRootPath from 'app-root-path';
import { response } from "express";

// filter image
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        req.fileValidationError = "Only image files are allowed";
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

// store image place
const storage = multer.diskStorage({
    destination :  (req, file, cb) => {
        cb(null, appRootPath +  '/src/public/images/')
    },
    filename : (req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, "name-project" + '-' + uniqueSuffix + ".jpg");
    }
    
});


// combine them to a function upload
const upload = multer({ storage: storage, fileFilter : imageFilter});


export default upload;