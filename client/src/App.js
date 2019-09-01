import React from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon
  } from "mdbreact";
  import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movie from './components/Movie';
import Artist from './components/Artist';
import AddMovie from './components/AddMovie'

function App() {
  return (
    <div className="App">
        <Router>
          <MDBNavbar color="indigo" dark expand="md">
            <MDBNavbarBrand>
            <strong className="white-text pl-5" style={{'fontSize': '32px'}}> <MDBIcon icon="film"/> AMDB</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler  />
            <MDBCollapse id="navbarCollapse3" navbar>
              <MDBNavbarNav right className='pr-5'>
                <MDBNavItem className='pr-2'>
                  <MDBNavLink to="/movies"><h5>Movies</h5></MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className='pr-2'>
                  <MDBNavLink to="/artists"><h5>Artists</h5></MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>      
            </MDBCollapse>
          </MDBNavbar>
          <Switch>
            <Route path='/movies' component={Movie}/>
            
            <Route path='/artists' component={Artist}/>

            <Route path='/add-movie' component={AddMovie} />
          </Switch>
          
        </Router>
    </div>
  );
}

export default App;
