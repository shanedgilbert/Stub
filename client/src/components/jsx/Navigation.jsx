import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import stublogo from '../../images/stublogo.png';
import useStyles from './styles';
import Login from './Login'

function Navigation({LoggedInState}) {
  const classes = useStyles();

  let navigate = useNavigate(); 
  const handleLogout = () =>{ 
    let path = '/'; 
    navigate(path);
    localStorage.removeItem('userLoginData');
    window.location.reload();
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
              <NavLink className="nav-link" to="/settings">
                  Settings
                </NavLink>
              </li> :false }
              {LoggedInState ? <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick = {handleLogout}>
                  Log Out
                </NavLink>
              </li> :false }
                 <li className="nav-item">
                  <Login />
              </li> 
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
