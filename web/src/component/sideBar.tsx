import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import '../styles/component/sideBar.css';
import mapMark from '../img/Logo.svg';


export default function Sidebar(){
    const { goBack } = useHistory();
    return(
        <aside className="app-sidebar">
        <img src={mapMark} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
}