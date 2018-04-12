import React, { Component } from 'react';
// import { BrowserRouter as Router,	Route,	Link, Redirect } from 'react-router-dom';
// import Game from './components/Board';
// import StartPage from './components/StartPage/StartPage';
import './Game.css';

const DATA = [
  {
  emogy: ['smile1', 'smile2','smile3','smile4'],
  ans: 'asdfgh'
  },
  {
  emogy: ['smile', 'smile','smile','smile'],
  ans: 'qwerty'
  },
]

class Game extends Component {

  constructor() {
    super();
    this.state = {
      index: 0,
      currentData: DATA[0],
    };
  }

  handleBtnClick = () => {
    let input = document.querySelector('.inputAns').value;
    if(input === this.state.currentData.ans) {
      alert('good )))');
      this.setState({
        currentData: DATA[++this.state.index],
      })
    } 
  }

  render() {
    return(    
      <div className='gamePage'>
        <div className='emojy'>
          {
            this.state.currentData.emogy.map(item => <span key={item} className={`emogy ${item}`}></span>)
          }
        </div>
        <input className='inputAns' type="text"/>
        <button onClick={this.handleBtnClick}>Submit</button>
      </div>   
    )       
  }
}

export default Game;