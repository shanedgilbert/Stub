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
      window.location.reload();
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
    {currentLoginData ? (<img id="loginImage" src={currentLoginData.picture.data.url} height={currentLoginData.picture.height} width={currentLoginData.picture.width} alt="avatar"/>) : (<LoginButton responseFacebook = {responseFacebook}/>)}             

</h1>
  );

}

export default Login;


