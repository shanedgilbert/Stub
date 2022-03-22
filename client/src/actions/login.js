import FacebookLogin from 'react-facebook-login'
import React from "react";



export const componentClicked = () => 
{
  console.log("clicked");
}

export const getLocalUser = () => 
{
  if(localStorage.getItem('userLoginData'))
  {
    return JSON.parse(localStorage.getItem('userLoginData'));
  }
  else
  {
    return null;
  }
}

export const setLocalUser = (userData) => 
{
  localStorage.setItem('userLoginData', JSON.stringify(userData));
  window.location.reload(true);
}

export const isLoggedIn = () =>
{
  if(localStorage.getItem('userLoginData'))
  {
    return true;
  }
  else
  {
    return false;
  }
}





