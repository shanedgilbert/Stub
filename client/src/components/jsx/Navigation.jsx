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
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto navbar-right">
            {LoggedInState ? <Nav.Link href="/lists">Lists</Nav.Link> : false}
            {LoggedInState ? <Nav.Link href="/logout">Logout</Nav.Link> : false}
            {/* {window.innerWidth >= 720 ? getProfile() : <Login LoggedIn={LoggedInState} setLoggedIn={setLoggedIn}/>} */}
            {LoggedInState ? getProfile() : <Login LoggedIn={LoggedInState} setLoggedIn={setLoggedIn}/>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
