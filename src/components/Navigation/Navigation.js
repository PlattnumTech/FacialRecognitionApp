import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
return (
   
    <nav style={{display: 'flex', justifyContent: 'flex-end' , color:'white'}}>
        <p onClick={ () => onRouteChange('signin')} className='f3 link dim underline pa3 pointer'>Sign Out</p>
    </nav> 
    );
}

export default Navigation;