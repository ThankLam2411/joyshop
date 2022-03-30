import multer from 'multer';
import path from 'path';
import express from 'express';
import { isAuth } from '../utils.js';
import db from '../config/database.js'

const uploadRouter = express.Router();

// 

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  // filename(req, file, cb) {
  //   cb(null, `${Date.now()}.jpg`);
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits:{fileSize:'1000000'},
  fileFilter:(req, file, cb) =>{
    const fileTypes = /jpeg|jpg|png|gif/
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname))
    if(mimetype && extname){
        return cb(null,true)
    }
    cb('Give propẻ file format to upload')
  }
 
    
 })

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  console.log('123',req.file)
  res.send(`/${req.file.path}`);
});


export default uploadRouter;
