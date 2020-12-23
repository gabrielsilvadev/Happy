import express from 'express';
import '../database/conection';
import 'express-async-errors'
import routes from '../routes';
import cors from 'cors'
import path from 'path'
import errosHandler from '../errors/handler';
const app= express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads',express.static(path.join(__dirname,'...','uploads')))
app.use(errosHandler)
app.listen(3333);