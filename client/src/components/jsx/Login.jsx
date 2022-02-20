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
    if(response.status == 'unknown') //no response at all
    {
      console.log(response.status);
      setLoggedIn(false);
      //window.location.reload();
    }
    else //some response
    {
      const userData = await response
      if(userData.error) //if userdata has error or interuption, like closing the login api screen during login
      {
        console.log('test1')
        console.log(response.status);
        setLoggedIn(false);
        //window.location.reload();
      }
      else //sucessful login, no interuptions 
      {
        console.log('test')
        console.log(response.status);
        setLocalUser(userData);
        createAccount(response);
        setLoggedIn(true);
      }
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


