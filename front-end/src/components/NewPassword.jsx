import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BASE_URL } from '../Constants';
import isEmail from 'validator/lib/isEmail';

export function NewPassword() {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [resMsg, setResMsg] = useState({});
  const location = useLocation();
  const { uid, token } = useParams();

  const inputHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const PASSWORD = formValues.password;
    const CONFRIM_PASSWORD = formValues.confirm_password;
    //   const regex = /^(?=.*\d)(?=.*[A-Za-z]).*$/;
    setFormErrors({});
    if (!PASSWORD) {
      setFormErrors({
        ...formErrors,
        passwordErr: 'Enter a valid Password',
      });
      return;
    }
    if (PASSWORD !== CONFRIM_PASSWORD) {
      setFormErrors({
        ...formErrors,
        confirmPasswordErr: "Password doesn't match ",
      });
      return;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const encodeduid = encodeURIComponent(uid);
    const encodedtoken = encodeURIComponent(token);
    validate();
    for (let e in formErrors) {
      if (formErrors[e]) {
        return;
      }
    }

    try {
      let body = {
        password: formValues.password,
        confirm_password: formValues.confirm_password,
      };
      let res = await axios.post(
        `${BASE_URL}/api/resetpassword/${encodeduid}/${encodedtoken}/`,
        body
      );
      setResMsg({
        done: true,
        msg: 'password reset complete',
      });
    } catch (e) {
      setResMsg({
        done: true,
        msg: 'Link expired',
      });
    }
  };

  return (
    <main className="auth layout text-white">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>New Password</h3>
            </div>
          </div>
          <div className="layout__body">
            <h2 className="auth__tagline">Enter Your new password</h2>
            <form className="form" onSubmit={onSubmitHandler}>
              <div
                className="form__group form__group"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              ></div>
              <div
                className="form__group form__group flex-column"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '1em',
                }}
              >
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*******"
                    onChange={inputHandler}
                    onBlur={validate}
                  />
                  {formErrors.passwordErr && (
                    <p className="my-2 text-danger lead">
                      {formErrors.passwordErr}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="*******"
                    onChange={inputHandler}
                    onBlur={validate}
                  />
                  {formErrors.confirmPasswordErr && (
                    <p className="my-2 text-danger lead">
                      {formErrors.confirmPasswordErr}
                    </p>
                  )}
                </div>
              </div>
              <button className="btn btn--main text-white" type="submit">
                Change
              </button>
            </form>
            {resMsg.done && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                  color: '#5dd693',
                  fontWeight: '900',
                }}
              >
                {resMsg.msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
