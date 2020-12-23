import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import   happyMapIcon from '../component/util/icon';
import SideBar from '../component/sideBar'
import {useParams} from 'react-router-dom'

import '../styles/pages/orphanage.css';
import api from "../services/api";
interface Orphanages{
  latitude:number;
  longitude:number;
  name:string;
  description:string;
  about:string;
  opening_hours:string;
  opening_on_weeks:string;
  images:{
    id:number;
    url:string;
  }[];

}
interface Orphanageparams{
  id:string
}
export default function Orphanage() {
  const params = useParams<Orphanageparams>();

  const [orphange,setOrphanage] = useState<Orphanages>();
  const [activeImageIndex,setactiveImageIndex] = useState(0);
  console.log(Orphanage);

  useEffect(() =>{
    api.get(`orphanages/${params.id}`).then(response =>{
      setOrphanage(response.data)
    })
    },[params.id])

  if (!orphange){
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <SideBar/>
   
      <main>
        <div className="orphanage-details">
          <img src={orphange.images[activeImageIndex].url} alt={Orphanage.name} />

          <div className="images">
           {orphange.images.map((image,index) =>{
             return(
              <button key={image.id} className={activeImageIndex === index ?'action': '' } type="button" onClick={()=>{
              setactiveImageIndex(index)
              }}>
              <img src={image.url} alt={orphange.name} />
            </button>
          
           )})}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphange.name}</h1>
            <p>{orphange.about}</p>

            <div className="map-container">
              <Map 
                center={[orphange.latitude,orphange.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphange.latitude,orphange.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://google.com/maps/dir/?api=1&destination=${orphange.latitude},${orphange.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphange.description}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphange.opening_hours}
              </div>
              {orphange.opening_on_weeks ? (
                 <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ):(
                <div className="open-on-weekends-dont-open">
                <FiInfo size={32} color="#FF6690" />
                Nao atendemos <br />
                fim de semana
              </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}