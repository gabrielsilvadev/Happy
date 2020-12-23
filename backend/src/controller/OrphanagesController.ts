import {Request,Response} from 'express'
import {getRepository} from 'typeorm';
import orphanages from '../models/orphanage';
import orphanagesviews from '../views/orphanagesviews';
import orphanagesview from '../views/orphanagesviews'
import * as Yup from 'yup';
export default {

    async show(request:Request,response:Response){
        const {id} =request.params; 
         const orphanagesRespository=getRepository(orphanages);

        const Orfanage = await orphanagesRespository.findOneOrFail(id,{
            relations:['images']
        });

        return response.json(orphanagesview.render(Orfanage));

    },
    async index(request:Request,response:Response){
        const orphanagesRespository=getRepository(orphanages);
         
        const Orfanages = await orphanagesRespository.find({
            relations:['images']
        });

        return response.json(orphanagesviews.renderMany(Orfanages));
    },
    async create(request:Request,response:Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            open_on_hours,
            open_on_weeks
        } = request.body;
     
       
        const orphanagesRespository=getRepository(orphanages);
        const requestImage= request.files as Express.Multer.File[];
        const images = requestImage.map(image => {
            return {path: image.filename}
        });
        const dados= {
            name,
            latitude,
            longitude,
            about,
            instructions,
            open_on_hours,
            open_on_weeks: open_on_weeks==='true',
            images
        }
        console.log(dados)
         const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude:Yup.number().required(),
            longitude:Yup.number().required(),
            about:Yup.string().required().max(300),
            instructions:Yup.string().required(),
            open_on_hours:Yup.string().required(),
            open_on_weeks:Yup.boolean().required(),
            images:Yup.array(Yup.object().shape({
             path: Yup.string().required()
            }))
        });
        await schema.validate(dados,{
            abortEarly:false,
        })
      const orphanage = orphanagesRespository.create(dados);
         
     
      await  orphanagesRespository.save(orphanage);
         return response.status(201).json(orphanage)
     }
}