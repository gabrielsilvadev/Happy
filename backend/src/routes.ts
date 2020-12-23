import {Router}   from 'express';
import multer from 'multer';
import uploadConfig from './config/config'
import OrphangesController from './controller/OrphanagesController';

const routes =Router();
const upload = multer(uploadConfig);
routes.post('/orphanages' ,upload.array('images'), OrphangesController.create);
routes.get('/orphanages',OrphangesController.index);
routes.get('/orphanages/:id',OrphangesController.show);


 export default routes;