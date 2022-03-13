import React,{setState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import stublogo from '../../images/stublogo.png';
import useStyles from './styles';
import Login from './Login'
import {getLocalUser,setLocalUser,componentClicked } from "../../actions/login";

function Navigation({LoggedInState, setLoggedIn}) {
  const classes = useStyles();



  const getProfile = () =>
  {
    const user = getLocalUser()
    return (
      <h1><img id="loginImage" src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/></h1>
    )
  }
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <img className={classes.image} src={stublogo} alt="icon" height="60" />
          <NavLink className="navbar-brand" to="/">
            Stub
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              {LoggedInState ? <li className="nav-item">
              <NavLink className="nav-link" to="/lists">
                  Lists
                </NavLink>
              </li> :false }
              {LoggedInState ? <li className="nav-item">
              <NavLink className="nav-link" to="/">
                  Settings
                </NavLink>
              </li> :false }
              {LoggedInState ? <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                  Log Out
                </NavLink>
              </li> :false }
                 <li className="nav-item">
                 {LoggedInState ? getProfile() : <Login LoggedIn={LoggedInState} setLoggedIn={setLoggedIn}/>}
              </li> 
              <NavLink className = "nav-link" to = "/dev">
                DevPage
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
