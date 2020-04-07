import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/Imagelinkform';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '6276d0c86b6945e6bc0600b155ac5736'
 });

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box //Response from API
  const image = document.getElementById('inputimage');//DOM mainpulation
  const width = Number(image.width);
  const height = Number(image.height);

  //return to fill out box state
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height -  (clarifaiFace.bottom_row * height)
   }
  }

  displayFacebox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

//Property of App Comp
onInputChange = (event) => { 
    this.setState( {input: event.target.value } ); //How to get value from input
} 

//Property of App Comp
onButtonSubmit = () => {
  this.setState({imageURL: this.state.input})
  app.models
  .predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input) //Sets the state button on the click 
    .then(response =>  this.displayFacebox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));

}

 render() {
  return (
    <div className="App">
      <Particles className='particles'
           params= {particleOptions}
      />
      <Navigation 

      />
      <Logo 

      />
      <Rank 

      />
      <ImageLinkForm 
        onInputChange={this.onInputChange}  //Since property of app comp, must use this.
        onButtonSubmit={this.onButtonSubmit} //Since property of app comp, must use this.
      />
      <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
    </div>
  );
}
}

export default App;
