import React from "react";
import stublogo from '../../images/stublogo.png';
import useStyles from './styles';
import Login from './Login';
import { getLocalUser } from "../../actions/login";
import './Navigation.css';
import { Nav, Navbar, Container } from "react-bootstrap"

function Navigation({ LoggedInState, setLoggedIn }) {
  const classes = useStyles();

  const getProfile = () =>
  {
    const user = getLocalUser()
    return (
      <h1><img id="loginImage" src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/></h1>
    )
  }
  return (
    <Navbar className="nav-styling" variant="dark" expand="lg">
      <Container>
        <Nav>
          <img className={classes.image} src={stublogo} alt="icon" height="60" />
        </Nav>
        <Navbar.Brand href="/">Stub</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;
