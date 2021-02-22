import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer as Link } from 'react-router-bootstrap'
import logo from '../assets/logo.png';

class Navigation extends Component {
    render() {
        return (
            <Navbar bg="light" expand='md' fixed='bottom'>
            <Navbar.Brand>
              <img src={logo} width="50" alt="logo"/>
              <span>Horizonism &copy;</span>
              </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar"/>
    
            <Navbar.Collapse>
            <Nav className="mr-auto">
              <Link to='/Howry/archive'>
              <Nav.Link>Archive</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <Link to='/Howry/'>
              <Nav.Link>Home</Nav.Link>
              </Link>
              <Link to='/Howry/about'>
              <Nav.Link>About</Nav.Link>
              </Link>
            </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
    }
}

export default Navigation