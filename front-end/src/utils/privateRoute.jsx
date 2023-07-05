import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
export default function PrivateRoute(props) {
    let {component: RouteComp} = props

    const { user, setUser } = useContext(AuthContext);
  
    console.log(user)
    let IsAuthenticated = true

  return (
    <div>
      {user ? <RouteComp></RouteComp> : <Navigate to='/login' />}
    </div>
  )
}
