import React,{useEffect,useState}from 'react';

import mapMark from '../img/Logo.svg';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import '../styles/pages/OrgMap.css';
import api from '../services/api';
import MarkMap from '../img/Local@2x.png';
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';


interface Orphanage{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

function  Orphanages(){
const [Orphange,setOrphanage] = useState<Orphanage[]>([])
const mapIcon = Leaflet.icon({
    iconUrl:MarkMap,
    iconSize:[58,68],
    iconAnchor:[29,68],
    popupAnchor:[170,2]
})
useEffect(() =>{
api.get('orphanages').then(response =>{
  setOrphanage(response.data)
})
},[])

    return(

   <div  id='page-map'>
 <aside>
 <header>
 <img   src={mapMark} alt='Happy'/>
  <h2>Escolha um orfanato no mapa </h2>

  <p>Muitas crianças estão
   esperando a sua visita :)</p>
  </header>
  <footer>
      <strong>
          Crato
      </strong>
      <span>
          Ceara
      </span>
  </footer>


 </aside>
<Map 
 center={[-7.2155136,-39.6099584]}
 zoom={12}
 style={{width:'100%',height:'100%'}}
>
<TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
{Orphange.map(orphanage=>{
    return(
<Marker icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]}
key={orphanage.id}
>
<Popup closeButton={false} minWidth={240} maxHeight={240} className='map-popup'>
 {orphanage.name}

 <Link to={`/orphange/${orphanage.id}`}>
 <FiArrowRight size={20} color='#fff'/>
 </Link>
</Popup>
</Marker>
    )
})}

</Map>
 <Link to='/orphange/create' className='create-orphanage'> <FiPlus size={32} color='#fff'/></Link>
   </div>

    );
}

export default Orphanages;