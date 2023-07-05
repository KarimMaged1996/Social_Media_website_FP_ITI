import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../Constants'

export function Activate() {
    const navigate = useNavigate()
    const {uid, token} = useParams()
    const encodeduid = encodeURIComponent(uid)
    const encodedtoken = encodeURIComponent(token)

    const activateAccount = async () => {
        try{
            let res = axios.get(`${BASE_URL}/api/activate/${encodeduid}/${encodedtoken}/`)
            console.log(res)
        }catch(e){
            navigate('*')
        }
    }
    useEffect(() => {
        activateAccount()
        navigate('/login')
    }, [])
  return (
    <div>
      
    </div>
  )
}