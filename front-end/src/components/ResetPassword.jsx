import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../Constants'

export function ResetPassword() {




    const onSubmitHandler = async () => {

        try{
            let res = await axios.post(`${BASE_URL}/resetpasswordlink`)
        }catch(e){
            alert(e)
        }
    }

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
            <form className="form" action="#" method="post">
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
                    // onChange={getInfo}
                  />
                  {/* {emailErr && <p>Email already exists</p>} */}
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
