import React, { Component } from 'react';
import './App.css';

const sounds = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

function Display (props){
  return <div id="display">
    <h3>Sound</h3>
    <h4> {props.currentId}</h4>
  </div>;
}

function audioPlay (audio){
  return document.getElementById(audio).play();
}

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      pads: ['Q', 'W', 'E', 'A','S', 'D', 'Z', 'X', 'C'],
      currentKey: '',
      currentId: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }
  
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPressed); 
  }
  
  
  handleClick(e){
    e.preventDefault();
    this.setState({
      currentKey: e.target.textContent, 
      currentId: e.target.id
    })
    audioPlay(e.target.textContent);
  }
  
  handleKeyPressed(e){
    e.preventDefault();
    let pad = sounds.find(function(element) {
      return element.keyCode === e.keyCode;
    });
    if (pad !== undefined){
      return audioPlay(pad.keyTrigger)
    }
    
  }
  
  render(){
    const renderPads = sounds.map(function(pad){
      return <div className="drum-pad" key={pad.keyTrigger} >
                <div className="label-pad" id={pad.id} 
               onClick={this.handleClick}
               >
                {pad.keyTrigger}
               </div>
        <audio className="clip" id={pad.keyTrigger} src={pad.url}></audio>
      </div>;
    }.bind(this));

    return(
      <div id='containerMachine'>
        <div id="container-pads">
          {renderPads}
        </div>
        <Display currentId={this.state.currentId}/>
      </div>
    )
  }
}

export default App;
