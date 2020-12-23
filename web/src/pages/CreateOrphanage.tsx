import React, { FormEvent, useState,ChangeEvent } from "react";
import { Map, Marker, TileLayer} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet'
import   happyMapIcon from '../component/util/icon';
import SideBar from '../component/sideBar';
import { FiPlus } from "react-icons/fi";



import '../styles/pages/create-orphanage.css';
import api from "../services/api";
import { useHistory } from "react-router-dom";



export default function CreateOrphanage() {
const history = useHistory();
const [position,setPosition] = useState({latitude: 0,longitude:0});
const [name,setName]=useState('')
const [about,setabout] = useState('');
const [intructions,setIntructions] = useState('');
const [opening_hours,setOpening_hours] =useState('');
const [open_on_weekends,setOpen_on_weekends] =useState(true);
const [files,setFiles]=useState<File[]>([]);
const [preview,setPreview] =useState<string[]>([]);

function HandleSelectImage(event:ChangeEvent<HTMLInputElement>){
  if(!event.target.files){
    return
  }
  const images = event.target.files;
  setFiles(Array.from(images));

  const SelcterPreview =files.map(image =>{
    return URL.createObjectURL(image)
  });
 setPreview(SelcterPreview)
}
async function HandleSubmit(event:FormEvent){
event.preventDefault();
const {latitude,longitude} =position;
const data = new FormData();

data.append('name',name);
data.append('latitude',String(latitude));
data.append('longitude',String(longitude));
data.append('about',about);
data.append('instructions',intructions);
data.append('open_on_hours',opening_hours);
data.append('open_on_weeks',String(open_on_weekends));
files.forEach(image =>{
  data.append('images',image)
})
console.log(data)
await api.post('orphanages',data);

alert('cadastro realizado com sucessso');

history.push('/app')
} 

function handleMapClick(event:LeafletMouseEvent){
 const {lat,lng} =event.latlng;
 setPosition({
   latitude:lat,
   longitude:lng
 })
}

  return (
    <div id="page-create-orphanage">
     <SideBar/>
      <main>
        <form className="create-orphanage-form" onSubmit={HandleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-7.2155136,-39.6099584]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
              >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && <Marker interactive={false} icon={happyMapIcon} position={[position.latitude,position.longitude]} />}
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name"  value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e => setabout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-conteiner">
                {preview.map(image=>{
                 return (
                   <img key={image} src={image} alt={name}/>
                 )
                })}
               <label htmlFor="image[]" className="new-image">
              
                <FiPlus size={24} color="#15b6d6" /> 
              </label>
              <input multiple type="file" id='image[]' onChange={HandleSelectImage}/>
              </div>
              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>
            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={intructions} onChange={e =>setIntructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours"  >Horario de funcionamento</label>
              <input id="opening_hours"  value={opening_hours} onChange={e => setOpening_hours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>
              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''}
                onClick={()=>{
                  setOpen_on_weekends(true)
                }}
                >
                  Sim
                  </button>
                <button type="button" className={!open_on_weekends ? 'active':''} onClick={()=>{
                  setOpen_on_weekends(false);
                }}>
                  Não
                  </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
