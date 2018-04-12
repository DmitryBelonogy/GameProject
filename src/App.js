import React, { Component } from 'react';
import { BrowserRouter as Router,	Route,	Link, Redirect } from 'react-router-dom';
import Board from './components/Board';
import StartPage from './components/StartPage';
import './App.css';

class App extends Component {
  render() {
    return(
      <Provider store={store}>      
        <Router>
          <div>        
            <Route path="/start_page" component={StartPage}/>
            <Route path="/game" component={Game}/>
            <Redirect from="" to="/start_page"/>
          </div>
        </Router>
      </Provider>      
    )       
  }
}

export default App;
