import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../assets/xml.svg';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function MyNav() {
  const { user, setTokens } = useContext(AuthContext);
  console.log('dddddddd', user);
  let navigate = useNavigate();

  function logout() {
    axios
      .post(
        'http://127.0.0.1:8000/api/logout/',
        {
          refresh: localStorage.getItem('refresh_token'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      )
      .then((response) => {
        setTokens(null);
        localStorage.clear();
        navigate('/login');
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

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
          <Nav
            className="header__menu me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* ... */}
          </Nav>
          {user ? (
            <Nav className="header__menu">
              <NavLink to="/profile">
                <div className="avatar avatar--medium active">
                  <img
                    src="https://randomuser.me/api/portraits/men/37.jpg"
                    alt="Avatar"
                  />
                </div>
                {/* ... */}
              </NavLink>
              <Nav.Link className=" text-white" onClick={logout}>
                Log Out
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="header__menu text-white">
              <Nav.Link href="/signup" className=" text-white">
                Sign Up
              </Nav.Link>
              <Nav.Link href="/login" className=" text-white">
                Log In
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
