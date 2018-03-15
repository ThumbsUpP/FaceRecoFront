import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageURL, box}) =>{
    return (
        <div className="center ma">
        <div className="absolute mt2">
            <img id='inputImage' src={imageURL} alt="" width='500px' heigh ='auto'/>
        <div className="bounding-box" style={{top: box.topRow, right:box.rightCol, left:box.lefcol, bottom:box.bottomCol}}></div></div>
        
        </div>
    )
}

export default FaceRecognition
