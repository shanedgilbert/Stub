import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Navigation, Footer, Home, Lists, Settings, Logout } from "./components/jsx";
import { isLoggedIn } from './actions/login';
import PrivateRoute from './components/jsx/PrivateRoute';
const App = () => {
  const [LoggedIn, setLoggedIn] = useState(isLoggedIn)

  return (
    <Router>
      <Navigation LoggedInState={LoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} /> {/*Test */}
        <Route path="/logout" element={<Logout LoggedInState={LoggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route
          path="/settings"
          element=
          {
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/lists"
          element=
          {
            <PrivateRoute>
              <Lists />
            </PrivateRoute>
          }
        />
    </Routes>
    <Footer />
  </Router>
  );
};

export default App;