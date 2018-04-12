import React, { Component } from 'react';
import './StartPage.css';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class StartPage extends Component {

  render() {
    return (
      <div className="start-wrapper">  
      <Link to="/game"><button>Start</button></Link>
      </div>
    )
  }
}

export default StartPage;