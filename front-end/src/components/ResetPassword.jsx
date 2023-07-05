import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../Constants'
import isEmail from 'validator/lib/isEmail';

export function ResetPassword() {

  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})

  const inputHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
      const EMAIL = formValues.email? formValues.email : ""
      if(!isEmail(EMAIL)){
        setFormErrors({
          ...formErrors,
          emailErr: 'Enter a valid Email'
        })
        return
      }
      setFormErrors({
        ...formErrors,
        emailErr: ""
      })
  }


    const onSubmitHandler = async (e) => {
      e.preventDefault()
       
        for(let e in formErrors){
          if(formErrors[e]){
            return
          }
        }

        
        try{
            let body = {
              "email": formValues.email
            }
            let res = await axios.post(`${BASE_URL}/api/resetpasswordlink/`, body)
            console.log(res)
        }catch(e){
            alert(e)
        }
    }

    console.log(formValues)
  return (
    <main className="auth layout text-white">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Forget Password</h3>
            </div>
          </div>
          <div className="layout__body">
            <h2 className="auth__tagline">Send Link To</h2>
            <form className="form" onSubmit={onSubmitHandler}>
              <div
                className="form__group form__group"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                
                
              </div>
              <div
                className="form__group form__group"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. example@yahoo.com"
                    onChange={inputHandler}
                    onBlur={validate}
                  />
                  {formErrors.emailErr && <p className='my-2 text-danger lead'>{formErrors.emailErr}</p>}
                </div>
              </div>
              <button className="btn btn--main text-white" type="submit">
                Send
              </button>
            </form>
            {/* {isSuccessful && (
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
            )} */}
           
          </div>
        </div>
      </div>
    </main>
  )
}
