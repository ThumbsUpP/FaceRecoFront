import React from 'react';
import './Logo.css'
import Brain from './FaceApplogo.png';
//import Tilt from 'react-tilt'



const Logo = () =>{
    return (
        <div className='ma3 align-items' >
            <div className="Tilt br4 shadow-2" style={{ height: 80, width: 80 }} >
            <div className="Tilt-inner pa2"> 
            <img src={Brain} alt="" width="100%"/> </div>
            </div>
        </div>
    )
}

export default Logo

//options={{ max : 55 }}