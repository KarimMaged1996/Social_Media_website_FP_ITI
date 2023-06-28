import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../assets/xml.svg';
import { AuthContext } from '../context/AuthContext';

export function MyNav({ isLoggedIn }) {

  const {user} = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/" className="header__logo">
          <img src={logo} alt="Logo" />
          <h1>Techster</h1>
        </Navbar.Brand>
        {user ? (
          <Form className="header__search">
            <label>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                {/* ... */}
              </svg>
              <input placeholder="Search Techster" />
            </label>
          </Form>
        ) : null}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="header__menu me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {/* ... */}
          </Nav>
          {user ? (
            <Nav className="header__menu">
              <Nav.Link href="#">
                <div className="avatar avatar--medium active">
                  <img src="https://randomuser.me/api/portraits/men/37.jpg" alt="Avatar" />
                </div>
                {/* ... */}
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="header__menu text-white">
              <Nav.Link href="/signup" className=" text-white">Sign Up</Nav.Link>
              <Nav.Link href="/login" className=" text-white">Log In</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
