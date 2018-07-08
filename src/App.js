import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Displayimage from './Components/Displayimage/Displayimage';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';



const particleOptions  ={
  particles: {
    number: {
      value: 200,
      density: {
        "enable": true,
        "value_area": 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}




class App extends Component {

constructor() {
super();
  this.state = {
    imageUrl:'',
    input:'',
    box: [],
    user:{
      id:'',
      name:'',
      email:'',
      count: '',
      password:''
    }
  }
}

loadUser = (data)=> {
  this.setState({user:{
    id:data.id,
    name:data.name,
    email:data.email,
    count:data.count,
    password:data.password
  }});
}

faceLocation = (data) => {
//console.log('data', data);
const boundingBoxArray = data.outputs[0].data.regions;
const image = document.getElementById('inputImage');
const width = Number(image.width);
const height = Number(image.height);
const FaceBoxArray = boundingBoxArray.map(regions =>{//FaceBoxArray is an array for boxdimesnion objects(line 152-157)
let boxValues = regions.region_info.bounding_box; // regions here is the first object in the array , then it becomes the second object in the second interation
let top = boxValues.top_row * height;
let left = boxValues.left_col* width;
let right = width-(boxValues.right_col* width);
let bottom = height-(boxValues.bottom_row* height);
return {
topBorder:top,
leftBorder:left,
rightBorder:right,
bottomBorder:bottom
}
})
return FaceBoxArray;
}

setFaceBoxDimentions = (FaceBoxArray) =>{
  console.log('boxDimensions', FaceBoxArray);
this.setState({box:FaceBoxArray});
}

onInputChange = (event) =>  {
  this.setState({input:event.target.value});
} 

detectButtonClick = (event) => {
console.log('clicked');
this.setState({imageUrl: this.state.input});
fetch('https://pacific-depths-37571.herokuapp.com/imageUrl',{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    imageUrl:this.state.input
  })
}).then(response => response.json())
.then(response => {
        fetch('https://pacific-depths-37571.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
            id: this.state.user.id
          })
        }).then(count => count.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{count:count}))
        }).catch(err =>{console.log('error in incrementing count')})

        this.setFaceBoxDimentions(this.faceLocation(response));

}).catch(err => console.log('error in getting clarifai data'));
}

  render() {
    return (
      <Router>
        <div className="App">
            <Particles className= 'particles' params={particleOptions}  />
           <Route  path="/" exact strict render= {() => {
             return (<Signin loadUser ={this.loadUser}/>);
           }}/>
           <Route path="/signup" exact strict render= {() => {
            return(<Signup loadUser ={this.loadUser}/>);
           }}/>
           <Route path="/app" exact strict render= {() => {
              return (
              <div>
                <Navigation />
                <Logo />
                <Rank name={this.state.user.name} count={this.state.user.count}/>
                <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.detectButtonClick}/>
                <Displayimage imageUrlEntered ={this.state.imageUrl} faceBoxDimnesions ={this.state.box}/>
              </div>
              );
           }}/>
            
          </div>
        </Router>
    );
  }
}

export default App;
