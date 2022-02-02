import FacebookLogin from 'react-facebook-login'
import React from "react";
export const apiKey = "1376624219436332"

const componentClicked = () => 
{
  console.log("Clicked");
}

{
}

export const LoginButton = ({responseFacebook}) => (
    <FacebookLogin
      appId={apiKey}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      icon="fa-facebook"/>
    )



