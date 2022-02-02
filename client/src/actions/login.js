import FacebookLogin from 'react-facebook-login'
import React from "react";
export const apiKey = "1376624219436332"

const responseFacebook = (response) => 
{
  console.log(response);
}

const componentClicked = () => 
{
  console.log( "Click." )
}

export const LoginButton = ({responseFacebook}) => (
    <FacebookLogin
      appId={apiKey}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      icon="fa-facebook"/>
    )



