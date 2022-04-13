import React from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {setLocalUser } from "../../actions/login";
import { createAccount } from '../../actions/accounts';
import FacebookAPIKey from '../../api/FacebookAPIKey';
import "../../index.css";
import fblogo from '../../images/fb.png';
const apiKey = FacebookAPIKey();

function Login({LoggedInState, setLoggedIn}) 
{
  const responseFacebook = async (response) => 
  {
    if(response.status === 'unknown') //no response at all
    {
      setLoggedIn(false);
    }
    else //some response
    {
      const userData = await response
      if(userData.error) //if userdata has error or interuption, like closing the login api screen during login
      {
        setLoggedIn(false);
      }
      else //sucessful login, no interuptions 
      {
        setLocalUser(userData);
        createAccount(response);
        setLoggedIn(true);
      }
    }
  };

  const LoginButton = ({responseFacebook}) => (
    <FacebookLogin
    appId={apiKey}
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook}
    render={renderProps => (
      <button class="button button1" onClick={renderProps.onClick}><img id="fbImage" src={fblogo} alt="avatar"/></button>
    )}
  />
    )
    
  return (
    <LoginButton responseFacebook = {responseFacebook}/>  
  );
}

export default Login;