import { request } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
const crypt =crypto.randomBytes(16)
export default{
    storage:multer.diskStorage({
        destination: path.join(__dirname,'..','..','uploads'),
        filename:(request,file,cb) => {
            const fileName = `${crypt.toString('hex')}-${file.originalname}`;
            cb(null,fileName)
        },
    })
}