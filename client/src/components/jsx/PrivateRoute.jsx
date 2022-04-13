import React from 'react'
import { Navigate } from "react-router-dom";
import { getLocalUser } from '../../actions/login';

function PrivateRoute({children}) {
  const isLoggedIn = getLocalUser();
  console.log('status ' + isLoggedIn)
  console.log(children)
  return  isLoggedIn ? children : <Navigate to="/" />;
}

export default PrivateRoute;