import db from '../../models/index';
import multer from 'multer';
import upload from '../../middlewares/uploadFile';

const NUMBER_IMAGES = 5;
let singleUpload = upload.single('file');
let multipleUpload = upload.array('files',NUMBER_IMAGES);



let uploadImage = async (req, res) => {
    singleUpload(req, res, async(err) => {
        if (req.fileValidationError) {
            return res.status(400).json({  status : "ERR",msg: req.fileValidationError})
        }
        if(!req.file || req.files){
            return res.status(412).json({status : "ERR", msg : "Please choose your image"});
        }
        if(err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.status(400).json({  status : "ERR",msg: `Maximum of 1 image allowed`});
        }else if (err instanceof multer.MulterError) {
            return res.status(400).json({  status : "ERR",msg: err})
        }

        await db.Image.create({
            name : req.file.filename,
            path : req.file.path
            }).then((result) => {
                return res.status(200).json({status: "OK", data : result});
            }).catch((err) => {
                return res.status(412).json({status : "ERR", msg : err.msg});
        });

        
    });
}


let uploadMultipleImages = (req, res) => {
     multipleUpload(req, res, async (err) => {
         if(err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE'){
             return res.status(400).json({  status : "ERR",msg: `Maximum of ${NUMBER_IMAGES} images allowed`});
         }
         if (req.fileValidationError) {
             return res.status(400).json({  status : "ERR",msg: req.fileValidationError})
         }
         else if (req.files.length < 1) {
             return res.status(412).json({status : "ERR", msg : "Please choose your image"});
         }else if(err){
            return res.status(400).json({  status : "ERR",msg: err});
         }

         const images = [];
         for (const file of req.files) {
            const image = await db.Image.create({
              name: file.originalname,
              path: file.path,
            });

         images.push(image);
         } 

         return res.status(200).json({status : "OK", data : images});
     });
}

export default {
    uploadImage,
    uploadMultipleImages
}