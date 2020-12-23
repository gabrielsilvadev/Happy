import {Entity,Column,PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm';

import Orphanages from './orphanage'
@Entity('images')
export default class Images {

    @PrimaryGeneratedColumn('increment')
    
    id:number;

    @Column()

    path:string;
    
    @ManyToOne(()=>Orphanages,orphanage => orphanage.images)
    @JoinColumn({name:'id_orphanege'})
    orphanage:Orphanages;
    

}