import React,{ useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function Logout({setLoggedIn}) 
{
    let navigate = useNavigate();
    const handleLogout = () =>
    {  
      let path = '/';
      navigate(path);
      setLoggedIn(false);
      localStorage.removeItem('userLoginData');
    }

    useEffect(() => {
      handleLogout();
    });
    return <Navigate to="/" />;
}

export default Logout;