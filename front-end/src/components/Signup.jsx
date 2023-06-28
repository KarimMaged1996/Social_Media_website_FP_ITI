import React from 'react';
import axios, { Axios } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
let fname, lname, username, email, password, confirmPassword, gender;

export function SignupPage() {
  let [notMatchErr, setNotMatchErr] = useState(false);
  let [worngPass, setWrongPass] = useState(false);
  let [emailErr, setEmailErr] = useState(false);
  let [usernameErr, setUsernameErr] = useState(false);
  let [isSuccessful, setIsSuccesfull] = useState(false);
  const regex = /^(?=.*\d)(?=.*[A-Za-z]).*$/;
  let navigate = useNavigate();
  function getInfo(e) {
    if (e.target.id === 'fname') {
      fname = e.target.value;
    } else if (e.target.id === 'lname') {
      lname = e.target.value;
    } else if (e.target.id === 'username') {
      username = e.target.value;
    } else if (e.target.id === 'email') {
      email = e.target.value;
    } else if (e.target.id === 'password') {
      password = e.target.value;
    } else if (e.target.id === 'confirm_password') {
      confirmPassword = e.target.value;
    } else if (e.target.id === 'male' || e.target.id === 'female') {
      gender = e.target.value;
    }
  }
  function register(e) {
    e.preventDefault();
    if (password !== confirmPassword && !regex.test(password)) {
      setNotMatchErr(true);
      setWrongPass(true);
    } else if (password !== confirmPassword) {
      setNotMatchErr(true);
    } else if (!regex.test(password)) {
      setWrongPass(true);
    } else if (password === confirmPassword && regex.test(password)) {
      setNotMatchErr(false);
      setWrongPass(false);
      axios
        .post('http://127.0.0.1:8000/api/register/', {
          firstname: fname,
          lastname: lname,
          username: username,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          gender: gender,
        })
        .then((response) => {
          setIsSuccesfull(true);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        })
        .catch((errors) => {
          if (errors.response.data.email) {
            setEmailErr(true);
          } else {
            setEmailErr(false);
          }
          if (errors.response.data.username) {
            setUsernameErr(true);
          } else {
            setUsernameErr(false);
          }
        });
    }
  }
  return (
    <main className="auth layout text-white">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Sign up</h3>
            </div>
          </div>
          <div className="layout__body">
            <h2 className="auth__tagline">Become a Techster</h2>
            <form className="form" action="#" method="post" onSubmit={register}>
              <div
                className="form__group form__group"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <label htmlFor="fname">First Name</label>
                  <input
                    id="fname"
                    name="fname"
                    type="text"
                    placeholder="e.g. Abanob"
                    onChange={getInfo}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lname">Last Name</label>
                  <input
                    id="lname"
                    name="lname"
                    type="text"
                    placeholder="e.g. Asaad"
                    onChange={getInfo}
                    required
                  />
                </div>
              </div>
              <div
                className="form__group form__group"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="e.g. Abanob"
                    onChange={getInfo}
                    required
                  />
                  {usernameErr && <p>Username already exists</p>}
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. example@yahoo.com"
                    onChange={getInfo}
                  />
                  {emailErr && <p>Email already exists</p>}
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={getInfo}
                  required
                  minLength={8}
                />
                {worngPass && (
                  <p>Your password must include letters and numbers</p>
                )}
              </div>
              <div className="form__group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  onBlur={getInfo}
                  required
                />
                {notMatchErr && <p>Your passwords don't match</p>}
              </div>
              <div className="form__group" style={{ display: 'flex' }}>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  value="m"
                  id="male"
                  name="gender"
                  style={{ height: '20px' }}
                  onChange={getInfo}
                  required
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  value="f"
                  id="female"
                  name="gender"
                  style={{ height: '20px' }}
                  onChange={getInfo}
                />
              </div>
              <button className="btn btn--main text-white" type="submit">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>lock</title>
                  <path d="M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z"></path>
                  <path d="M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z"></path>
                </svg>
                Sign Up
              </button>
            </form>
            {isSuccessful && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                  color: '#5dd693',
                  fontWeight: '900',
                }}
              >
                Check your email for acctivation link
              </div>
            )}
            <div className="auth__action">
              <p>Already have an account?</p>
              <a href="login.html" className="btn btn--link text-white">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
