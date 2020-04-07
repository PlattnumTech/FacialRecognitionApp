import React from 'react';
import './Imagelinkform.css';

//Image input lonk component
const Imagelinkform = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain'}
            </p>
            <div className='center'>
                <div className=' form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button 
                    className='w-30 grow f4 ph3 pv2 dib white '
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
        );
    }
    
    export default Imagelinkform;