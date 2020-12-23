import {Entity,Column,PrimaryGeneratedColumn, OneToMany,JoinColumn} from 'typeorm';
import Image from './image'
@Entity('orphaneges')
export default class Orphanage {

    @PrimaryGeneratedColumn('increment')
    
    id:number;

    @Column()

    name:string;

    @Column()

    latitude:number;
    @Column()

    longitude:number;

    @Column()

    about:string;

    @Column()

    instructions: string;

    @Column()

    open_on_hours:string;

    @Column()

    open_on_weeks:boolean;


    @OneToMany(()=> Image, images => images.orphanage,{
    cascade:['insert','update']
    })
    @JoinColumn({name:'id_orphanages'})
    images: Image[];
   

}