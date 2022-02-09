import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { getLocalUser } from '../../actions/login';


function PrivateRoute({children}) {
  const isLoggedIn = getLocalUser();
  console.log('status ' + isLoggedIn)
  console.log(children)
  return  isLoggedIn ? children : <Navigate to="/" />;
}

export default PrivateRoute;