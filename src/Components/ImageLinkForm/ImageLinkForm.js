import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return (
        <div>
            <p className='f4 white'>
            {'Need help to detect a face in an image? Give it a try !'}
            </p>
            <div className='center'>
                <div className="form center pa4 br2 shadow-2 form-color">
                    <input onChange={onInputChange} className='f4 pa2 w-70 center' type="text"/>
                    <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white' id="buttonSubmit" >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm