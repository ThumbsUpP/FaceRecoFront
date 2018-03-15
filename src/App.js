import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

 
 const particulesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}   
    
const initialState = {
  input: '',
      imageURL: '',
      box: {},
      route: 'Register',
      isSignedIn : false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joinded: ''
      }

}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const face = data.rawData.outputs["0"].data.regions["0"].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      lefcol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomCol: height - (face.bottom_row * height)
    }
  }

  displayFacebox = (box) => {
    this.setState({box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = (e) => { 
  
    this.setState({imageURL: this.state.input});

    fetch('https://salty-tor-84422.herokuapp.com/imageInput', {
      method : 'post',
      headers : {'content-type' : 'application/json'},
      body : JSON.stringify({input: this.state.input})})
      .then(response => response.json())
      .then(response => {
        fetch('https://salty-tor-84422.herokuapp.com/image', {
          method : 'put',
          headers : {'content-type' : 'application/json'},
          body : JSON.stringify({ id: this.state.user.id})})
        .then(response => response.json())
        .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
        .catch(err => console.log(err));
        this.displayFacebox(this.calculateFaceLocation(response))
      })
    .catch(err => console.log('error fetching'))
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const {isSignedIn, imageURL, box, route} = this.state;
    return (
      <div className="App">
        <Particles className="particules" params={particulesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
        ? <div>
            
            <Logo /> 
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageURL = {imageURL} />
        </div>
        : ( route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
         : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> )
        
        
}
      </div>
    );
  }
}

export default App;
