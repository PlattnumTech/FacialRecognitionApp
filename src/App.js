import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/Imagelinkform';
import Rank from './components/Rank/Rank';
import './App.css';
import { render } from '@testing-library/react';

const particleOptions = {
  particles: {
    number: {
        value: 30,
        density: {
          enable: true,
          value_area: 500 
        }
      }
   }
 }  

class App extends Component() {
constructor(){
  super();
  this.state = {
      input: '',
  }
}
}

  onInputChange = (event) => {
    console.log(event.target.value)
  }
  

 render() {
  return (
    <div className="App">
      <Particles className='particles'
                params={{particleOptions}}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
    </div>
  );
}

export default App;
