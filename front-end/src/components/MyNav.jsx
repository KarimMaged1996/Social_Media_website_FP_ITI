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
import { SearchContext } from '../context/SearchContext';
import Dropdown from 'react-bootstrap/Dropdown';
export function MyNav() {
  const { user, setTokens } = useContext(AuthContext);
  const { searchResults, setSearchResults } = useContext(SearchContext);
  let navigate = useNavigate();
  console.log('user1', user);
  function search(e) {
    let params = {
      s: e.target.value,
    };
    let token = localStorage.getItem('access_token');
    let headers = { Authorization: `Bearer ${token}` };

    if (e.keyCode === 13) {
      e.preventDefault();
      axios
        .post('http://127.0.0.1:8000/api/search/', {}, { params, headers })
        .then((response) => {
          setSearchResults(response.data.msg);
          navigate('/search');
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  }
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

        <NavLink to={"/"} > 
          
        <Navbar.Brand className="header__logo">
          <img src={logo} alt="Logo" />
          <h1>Techster</h1>
        </Navbar.Brand>
          
          </NavLink> 
        


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
              <input placeholder="Search Techster" onKeyDown={search} />
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
            <div>
              <Nav className="header__menu">
                <NavLink to={`/profile/${user.id}`}>
                  <div className="avatar avatar--medium active">
                    <img
                      src={
                        user.avatar
                          ? `http://127.0.0.1:8000${user.avatar}`
                          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                      }
                      alt="Avatar"
                    />
                    <span className="nav-link__username">{user.username}</span>
                  </div>
                  {/* ... */}
                </NavLink>

                <Dropdown className="mx-3">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="fs-4"
                  >
                    {user.userName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: '160px' }}>
                    <NavLink to="/editprofile">
                      <p className="text-white">Edit Profile</p>
                    </NavLink>
                    <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              <NavLink to="/explore" className="mx-5 text-white">Explore</NavLink>
              <NavLink to="/chat" className="mx-5 text-white">Chat</NavLink>

              </Nav>
            </div>
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
