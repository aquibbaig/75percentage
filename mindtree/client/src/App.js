import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" render = {() => <Home/>}/>
              <Route exact path="/login" render={() => <Login/>}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
