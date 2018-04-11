import React, { Component } from 'react';
import './BoardCell.css';

let IS_MOUSE_DOUN = false;

class BoardCell extends Component {

  targetCells = (e) => {
    document.addEventListener('mousedown', () => IS_MOUSE_DOUN = true);
    document.addEventListener('mouseup', () => IS_MOUSE_DOUN = false); 
    if(!IS_MOUSE_DOUN) return;
    if(e.target.classList.contains('active')) return;    
    e.target.classList.add('active');    
  }

  render() {
    return (
      <div className='boardCell' 
          onMouseOver={(e) => this.targetCells(e)} 
          onMouseDown={(e) => this.activateCell(e)} 
          touches='true'
      >
        {this.props.data}
      </div>
    );
  }  
}

export default BoardCell;