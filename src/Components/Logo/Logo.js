import React from 'react';
import './Logo.css'
import Brain from './brain.png';
import Tilt from 'react-tilt'



const Logo = () =>{
    return (
        <div className='ma4 mt0 flex-start' >
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner pa3"> 
            <img src={Brain} alt="" width="100%"/> </div>
            </Tilt>
        </div>
    )
}

export default Logo