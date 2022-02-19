import React,{ useState } from "react";
import FacebookLogin from 'react-facebook-login'
import {getLocalUser,setLocalUser,componentClicked } from "../../actions/login";
import { createAccount } from '../../actions/accounts';
import FacebookAPIKey from '../../api/FacebookAPIKey';
import "../../index.css";

const apiKey = FacebookAPIKey();



function Login({LoggedInState, setLoggedIn}) 
{
  const responseFacebook = async (response) => 
  {
    if(response.status == 'unknown')
    {
      window.location.reload();
    }
    else
    {
      const userData = await response
      console.log(response.status);
      setLocalUser(userData);
      createAccount(response);
      setLoggedIn(true);
    }
  };

  const LoginButton = ({responseFacebook}) => (
  
    <FacebookLogin
      appId={apiKey}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      icon="fa-facebook"/>
    )


  return (

    <h1>
    <LoginButton responseFacebook = {responseFacebook}/>  

</h1>
  );

}

export default Login;


