import React from "react";
import { NavLink } from "react-router-dom";
import stublogo from '../../images/stublogo.png';
import useStyles from './styles';

function Navigation() {
  const classes = useStyles();
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/lists">
                  Lists
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  Settings
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/log-in">
                  Log in
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
