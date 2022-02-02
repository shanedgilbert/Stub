import React,{ useState } from "react";
import {  LoginButton,getLocalUser,setLocalUser } from "./actions/login";





function Login() 
{
  const [currentLoginData, setLoginDataState] = useState(getLocalUser());
  
  const responseFacebook = async (response) => 
  {
    const userData = await response;
    setLoginDataState(userData);
    setLocalUser(userData);
  };

  const handleLogout = () => //testing purpose only
  {
    localStorage.removeItem('userLoginData');
    setLoginDataState(null);
  };

const TestScreen = ({user}) => ( //testing purpose only
  <>
    <h1>Welcome {user.name} {user.id}!</h1>
    <div><img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/></div>
    <button onClick={handleLogout}>Logout</button>
  </>
      )

  return (
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
          <h1 class="font-weight-light">Sign In</h1>
            <p>
            {currentLoginData ? (<TestScreen user = {currentLoginData}/>) : (<LoginButton responseFacebook = {responseFacebook}/>)}             
            </p>
          </div>
          </div>
        </div>
  );

}

export default Login;

