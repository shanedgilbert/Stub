import FacebookLogin from 'react-facebook-login'
import React from "react";
export const apiKey = "1376624219436332"

const componentClicked = () => 
{
  console.log("Clicked");
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

export const LoginButton = ({responseFacebook}) => (
    <FacebookLogin
      appId={apiKey}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      icon="fa-facebook"/>
    )



