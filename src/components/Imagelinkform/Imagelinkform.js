import React from 'react';
import './Imagelinkform.css';

//Image input lonk component
const Imagelinkform = () => {
    return (
        <div>
            <p classname='f3'>
                {'This Magic Brain'}
            </p>
            <div className='center'>
                <div className=' form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex'/>
                    <button className='w-30 grow f4 ph3 pv2 dib white '>Detect</button>
                </div>
            </div>
        </div>
        );
    }
    
    export default Imagelinkform;