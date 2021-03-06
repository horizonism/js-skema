import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Archive from './components/Archive'
import Register from './components/Register'
import SuratMasuk from './components/SuratMasuk'
import SuratMasukUpdate from './components/SuratMasukUpdate'
import SuratKeluar from './components/SuratKeluar'
import SuratKeluarUpdate from './components/SuratKeluarUpdate'
import Disposisi from './components/Disposisi'
import DisposisiUpdate from './components/DisposisiUpdate'
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
            <Route path='/Howry/suratmasuk' component={SuratMasuk}/>
            <Route path='/Howry/smupdate' component={SuratMasukUpdate}/>
            <Route path='/Howry/suratkeluar' component={SuratKeluar}/>
            <Route path='/Howry/skupdate' component={SuratKeluarUpdate}/>
            <Route path='/Howry/disposisi' component={Disposisi}/>
            <Route path='/Howry/dupdate' component={DisposisiUpdate}/>
          </Switch>
          <Navigation />
        </Router>
      </div>
    )
  }
}

export default App;
