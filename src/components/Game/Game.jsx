import React, { Component } from 'react';
import Modal from 'react-modal';
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
];

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Game extends Component {

  constructor() {
    super();
    this.state = {
      index: 0,
      currentData: DATA[0],
      modalIsOpen: false,
      completed: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({completed: !this.state.completed});
  }

  handleBtnClick = () => {
    this.openModal();
    let input = document.querySelector('.inputAns').value;
  
    if(input === this.state.currentData.ans) {
      this.setState({completed: !this.state.completed});
      this.setState({
        currentData: DATA[++this.state.index],
      })
    } 
  }

  render() {
    return(    

      <div className='gamePage'>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {this.state.completed? <h1>You Win!</h1> : <h1>You lose</h1>}
        <button onClick={this.closeModal}>ok</button>
      </Modal>
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