import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Archive from './components/Archive'
import Register from './components/Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
class App extends Component{
  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route exact path='/Howry/' component={Home}/>
            <Route path='/Howry/about' component={About}/>
            <Route path='/Howry/archive' component={Archive}/>
            <Route path='/Howry/signup' component={Register}/>
          </Switch>
          <Navigation />
        </Router>
      </div>
    )
  }
}

export default App;
