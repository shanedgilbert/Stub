import React,{ useState } from "react";
import {  LoginButton,getLocalUser,setLocalUser } from "../../actions/login";
import "../../index.css";

function Login()
{
  const [currentLoginData, setLoginDataState] = useState(getLocalUser());

  const responseFacebook = async (response) =>
  {
    const userData = await response;
    setLoginDataState(userData);
    setLocalUser(userData);
    window.location.reload();
  };

  const handleLogout = () => //testing purpose only
  {
    localStorage.removeItem('userLoginData');
    setLoginDataState(null);
    window.location.reload();
  };

  return (

            <h1>
            {currentLoginData ? (<img id="loginImage" src={currentLoginData.picture.data.url} height={currentLoginData.picture.height} width={currentLoginData.picture.width} alt="avatar"/>) : (<LoginButton responseFacebook = {responseFacebook}/>)}             

        </h1>
  );

}

export default Login;
