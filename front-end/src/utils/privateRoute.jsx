import React from 'react'
import { Navigate, Route } from 'react-router-dom'

export default function PrivateRoute(props) {
    let {component: RouteComp} = props
  
    let IsAuthenticated = true

  return (
    <div>
      {IsAuthenticated ? <RouteComp></RouteComp> : <Navigate to='/login' />}
    </div>
  )
}
