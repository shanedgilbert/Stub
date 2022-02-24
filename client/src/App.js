import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, Lists, Settings } from "./components/jsx";
import {ListPage, List} from "./components/ListsFolder";

import { isLoggedIn } from './actions/login';
import PrivateRoute from './components/jsx/PrivateRoute';
const App = () => {
  const [LoggedIn, setLoggedIn] = useState(isLoggedIn)

  return (
    <Router>
      <Navigation LoggedInState={LoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} /> {/*Test */}
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
        >
        <Route path="" element={<ListPage />} />
        <Route path=":postSlug" element={<List />} />
      </Route>
    </Routes>
    <Footer />
  </Router>
  );
};

export default App;
