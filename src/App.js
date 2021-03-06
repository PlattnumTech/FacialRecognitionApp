import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/Imagelinkform';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
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
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '' , 
         name: '',
         email:'',
         password: '',
         entries: 0,
         joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id , 
      name: data.name,
      email:data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
  }})
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
    this.setState({box: box});
  }

//Property of App Comp
onInputChange = (event) => { 
    this.setState( {input: event.target.value } ); //How to get value from input
} 

//Property of App Comp
onPictureSubmit = () => {
  this.setState({imageURL: this.state.input})
  app.models
  .predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input) //Sets the state button on the click 
    .then(response => {
      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
        
        })
      })
      //Promise after botton is clicked
      .then(response => response.json())
      .then(count => {
          //Use Object.assign to only change the state of the entry property of the user
          this.setState(Object.assign(this.state.user, {entries: count}))
      })
    }
       this.displayFacebox(this.calculateFaceLocation(response))
      })
    .catch(err => console.log(err));

}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

 render() {
    //Destructing so no longer have to use 'this.'
    const { isSignedIn, imageURL, route, box } = this.state;
  return (
    <div className="App">
      <Particles className='particles'
           params= {particleOptions}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
     { route === 'home'
      ?   <div>
            <Logo  />
            <Rank name={this.state.user.name} entries={this.state.user.entries}
             />
            <ImageLinkForm 
              onInputChange={this.onInputChange}  //Since property of App comp, must use this.
              onPictureSubmit={this.onPictureSubmit} //Since property of App comp, must use this.
            />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
          : (
             route ==='signin'
              ? <SignIn onRouteChange={this.onRouteChange}/> //object assigned to the onClick 
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> //object assigned to the onClick 
          )
          
     }
    </div>
  );
}
}
export default App;
