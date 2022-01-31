import React,{ useState, useEffect } from "react";
import { componentClicked, LoginButton,UserScreen } from "./actions/login";




function Login() {
 
  return (
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
          <h1 class="font-weight-light">Sign In</h1>
            <p>
                <LoginButton/>                
            </p>
          </div>
          </div>
        </div>
  );

}

export default Login;