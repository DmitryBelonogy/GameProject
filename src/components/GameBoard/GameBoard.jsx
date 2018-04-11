import React, { Component } from 'react';
import './GameBoard.css';

import BoardCell from '../BoardCell/BoardCell';
import ButtonHint from '../ButtonHint/ButtonHint';

const data = [
  ['С', 'O', 'Д', 'С'],
  ['С', 'К', 'О', 'А'],
  ['О', 'М', 'М', 'Д'],
  ['К', 'И', 'Н', 'О']  
];

const dataCheck = [
  [1, 1, 3, 4],
  [2, 1, 3, 4],
  [2, 2, 3, 4],
  [5, 5, 5, 5]  
]

let CURRENT = [];
let PREV = [];
let WORD = [];
let CELL_SIZE = 30;
let HINT_NUMBER = null;
let PREV_HINT_CELL = {};
let CURRENT_HINT_CELL = {};


class GameBoard extends Component {

  componentWillMount() {
    let sclientWidth = document.documentElement.clientWidth;
    sclientWidth >= 320 ? CELL_SIZE = 30 : CELL_SIZE;
    sclientWidth >= 360 ? CELL_SIZE = 30 : CELL_SIZE;
    sclientWidth >= 410 ? CELL_SIZE = 35 : CELL_SIZE;
    sclientWidth >= 760 ? CELL_SIZE = 65 : CELL_SIZE;
    sclientWidth >= 1020 ? CELL_SIZE = 85 : CELL_SIZE;
  }

  handlerTouchMove = (e) => {
    if(!e.target.classList.contains('boardCell')) {
      return;
    }
    PREV = CURRENT;    
    let obj = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
    if(obj.classList.contains('boardRow')) return;    
    CURRENT = [Math.floor(obj.offsetTop/CELL_SIZE), Math.floor(obj.offsetLeft/CELL_SIZE)];
    if(CURRENT[0] === PREV[0] && CURRENT[1] === PREV[1]) {
      return;
    } else {
      if((CURRENT[0] - 1 === PREV[0] && CURRENT[1] - 1 === PREV[1]) ||
        (CURRENT[0] - 1 === PREV[0] && CURRENT[1] + 1 === PREV[1]) || 
        (CURRENT[0] + 1 === PREV[0] && CURRENT[1] - 1 === PREV[1]) ||
        (CURRENT[0] + 1 === PREV[0] && CURRENT[1] + 1 === PREV[1]) 
      ) {
        return;
      } else {
        obj.classList.add('active');
        WORD.push(CURRENT);
      }
    };
  }

  handlerTouchEnd = () => {
    let touchOK = false;
    for(let i = 0; i < WORD.length - 1; i++) {
        if(dataCheck[WORD[i][0]][WORD[i][1]] === dataCheck[WORD[i + 1][0]][WORD[i + 1][1]]) {
          touchOK = true        
        } else {
          touchOK = false;
          break;
        }    
    }
    if(touchOK) {
      document.querySelectorAll('.active').forEach(item => item.classList.add('chose'));
      alert('ok');
      WORD = [];
      CURRENT = [];
      PREV = [];
    } else {
      WORD = [];
      CURRENT = [];
      PREV = [];
      document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
    }
  }

  handlerMouseMove = (e) => {

  }

  handleHintClick = () => {
    let gameboard = document.querySelector('.gameBoard');    
    PREV_HINT_CELL = {...CURRENT_HINT_CELL};   
    if(PREV_HINT_CELL.elem) {
      PREV_HINT_CELL.elem.classList.add('chose');
      let a = PREV_HINT_CELL.a,
          b = PREV_HINT_CELL.b;
      for(let i = -1; i <= 1; i++) {
        if(a + i < 0) continue;
        for(let j = -1; j <= 1; j++) {
          if(b + j < 0) continue;
          if(i === j) continue;
          if(i === 0 && j === 0) continue;
          if(dataCheck[a + i][b + j] === HINT_NUMBER){
            gameboard.childNodes[a + i].childNodes[b + j].classList.add('active');
            CURRENT_HINT_CELL = {
              elem: gameboard.childNodes[a + i].childNodes[b + j],
              a: a + i,
              b: b + j
            }
            break;
          }
          if(PREV_HINT_CELL.elem === CURRENT_HINT_CELL.elem) {
            CURRENT_HINT_CELL = {};
            PREV_HINT_CELL = {};
            HINT_NUMBER = null;
            break;
          }          
        }
        break;
      }
      console.log(PREV_HINT_CELL, CURRENT_HINT_CELL)
      return;
    }     
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    if(!HINT_NUMBER) HINT_NUMBER = dataCheck[a][b];
    CURRENT_HINT_CELL.elem = gameboard.childNodes[a].childNodes[b];
    CURRENT_HINT_CELL.a = a;
    CURRENT_HINT_CELL.b = b;
    CURRENT_HINT_CELL.elem.classList.add('active');
    console.log(PREV_HINT_CELL, CURRENT_HINT_CELL);
  }

  componentDidMount() {
    document.addEventListener("touchmove", this.handlerTouchMove, false);
    document.addEventListener('touchend', this.handlerTouchEnd, false);
  }

  render() {
    return (
      <div className='gameWindow'>
        {/* <ButtonHint data={15} handleHintClick={this.handleHintClick} /> */}
        <div className='gameBoard'>        
          {
            data.map((items, index) => {
              return (
                <div className='boardRow' key={index}>
                  {
                    items.map((item, index) => <BoardCell key={index} data={item} />)
                  }
                </div>
              )            
            })
          }
        </div>
      </div>      
    );
  }
}

export default GameBoard;